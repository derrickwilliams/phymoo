"use strict";

(function (angular) {
  "use strict";

  var app = undefined;

  app = angular.module("phymoo.dataServices", ["LocalForageModule"]);

  app.constant("PHYMOO_DATA_LF_KEY", "PHYMOO_DATA");

  app.config(function ($localForageProvider) {
    $localForageProvider.config({
      name: "phymoo", // name of the database and prefix for your data,
      version: 1, // version of the database, you shouldn't have to use this
      storeName: "phymoo" });
  });
})(angular);

(function (angular) {
  "use strict";

  var phymooData = undefined;

  phymooData = ["$localForage", "PHYMOO_DATA_LF_KEY", phymooDataFn];

  angular.module("phymoo.dataServices").factory("phymooData", phymooData);

  function phymooDataFn($lf, PHYMOO_DATA_LF_KEY) {
    var self = undefined;

    self = {
      load: load,
      store: store
    };

    return self;

    function load(keySuffix) {
      return $lf.getItem(buildKey(PHYMOO_DATA_LF_KEY, keySuffix));
    }

    function store(keySuffix, data) {
      return $lf.setItem(buildKey(PHYMOO_DATA_LF_KEY, keySuffix), data);
    }
  }

  function buildKey(base, suffix) {
    return "" + base + "_" + (suffix || "");
  }
})(angular);

(function (angular) {
  var app, moodRecords;

  app = angular.module("phymoo.dataServices");

  moodRecords = ["phymooData", moodRecordsFn];

  app.factory("phymooDataMoodRecords", moodRecords);

  function moodRecordsFn(phymoodData) {}
})(angular);
// name of the table

//# sourceMappingURL=data-compiled.js.map