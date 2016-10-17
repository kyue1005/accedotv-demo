'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HistorySchema = new Schema({
  session: { type : String, default : '', trim : true },
  records: [{
    vid: { type : String, default : '', trim : true },
    title: { type : String, default : '', trim : true },
    createdAt: { type : Date, default : Date.now }
  }]
});

/**
 * Validations
 */

HistorySchema.path('session').required(true, 'Session cannot be blank');

/**
 * Methods
 */

HistorySchema.methods = {
  /**
   * Add record
   *
   * @param {Object} record
   * @api private
   */

  addRecord: function (record) {
    this.records.unshift({
      vid: record.vid,
      title: record.title
    });
    return this.save();
  },
  
  /**
   * Remove comment
   *
   * @param {commentId} String
   * @api private
   */

  removeRecord: function (vid) {
    const index = this.records
      .map(record => record.vid)
      .indexOf(vid);

    if (~index) this.records.splice(index, 1);
    else throw new Error('Record not found');
    return this.save();
  }
};

/**
 * Statics
 */

HistorySchema.statics = {

  /**
   * Find article by id
   *
   * @param {ObjectId} id
   * @api private
   */

  load: function (sessionKey) {
    return this.findOne({ session: sessionKey })
      .exec();
  }
};


mongoose.model('History', HistorySchema);