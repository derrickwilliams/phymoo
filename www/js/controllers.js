var app = angular.module('phymoo.controllers', [
  'ionic'
]);

app.controller('DashCtrl', [
  '$ionicModal',
  'phymooData',
  '$scope',
  '$filter',
  DashCtrl
]);

function DashCtrl($ionicModal, phymooData, $scope, $filter) {
  var vm = this;
  var activeMood = 1;

  vm.symptoms = [
    {
      id: 'nausea',
      name: 'Nausea'
    },
    {
      id: 'palpitations',
      name: 'Palpitations'
    },
    {
      id: 'euphoria',
      name: 'Euphoria'
    }
  ];

  setupModal();

  vm.selectSymptom = function selectSymptom(id) {
    console.log('symptom id', id);
  };

  vm.addEntry = function addEntry() {
    vm.today = $filter('date')(new Date(), 'EEE. MMM. d, yyyy');
    vm.modal.show();
  };

  vm.hideModal = function hideModal() {
    vm.modal.hide();
  };

  vm.isActive = function isActive(index) {
    return activeMood === index;
  };

  vm.setActive = function setActive(index) {
    activeMood = index;
  };

  $scope.$on('modal.hidden', function() {
    console.log('its hid', $scope, vm.modal);
  });

  function setupModal() {
    $ionicModal.fromTemplateUrl('add-entry-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      vm.modal = modal;
    });
  }
}

app.controller('SettingsCtrl', [
  'phymooData',
  SettingsCtrl
]);

function SettingsCtrl(phymooData) {
  console.log('phymooData', phymooData);

  let self = this;

  self.data = {};

  self.doSomething = function doSomething(pos) {
    console.log('hey', pos);
  };

  phymooData.load('testData')
    .then((data) => {
      console.log('the data', data);
      self.data = JSON.stringify(data, null, 2);

    })
    .catch(function(err) {
      console.log('err)', err)
    });

}
