/**
 * Copyright 2013 the PM2 project authors. All rights reserved.
 * Use of this source code is governed by a license that
 * can be found in the LICENSE file.
 */
'use strict';

/**
 * @file In process daemon execution functions related
 * @project PM2
 */
var pkg           = require('../../package.json');

/**
 * Description
 * @method exports
 * @param {} God
 * @return
 */
module.exports = function DaemonMode(God) {

  /**
   * Executs a given module within the daemon process.
   * @method daemonExtension
   * @param {} env_copy
   * @param {} cb
   * @return Literal
   */
  God.daemonExtension = function daemonExtension(env_copy, cb){
    var clu = null;

    console.log('Starting execution sequence in -daemon mode- for app name:%s id:%s',
                env_copy.name,
                env_copy.pm_id);

    env_copy._pm2_version = pkg.version;

    try {
      require(env_copy.pm_exec_path)(God, env_copy);
      return cb();
    } catch (err) {
      return cb(err);
    }
  };
};
