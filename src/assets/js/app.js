(function(){

	'use strict';

	// Define angular core.mocking module
	angular.module('core.mocking', ['ngMockE2E']);

})();
(function(){

	'use strict';

	// Define angular core.routing module
	angular.module('core.routing', ['ui.router']);

})();
(function(){

	'use strict';

	// Define angular app module
	angular.module('app', ['core.routing', 'core.mocking', 'ui.router']);

})();
(function() {

  'use strict';

    // Pass the usersFactory to the app
    usersFactory.$inject = ["$http"];
    angular
        .module('app')
        .factory('usersFactory', usersFactory);


    // Define the usersFactory
    function usersFactory($http) {


        // Inject with ng-annotate
        "ngInject";


        // Define base URI for user user
        var userBase = '/api/v1/users/';


        // Define the user factory object to return
        var usersFactory = {

            index: index,
            show: show,
            store: store,
            update: update,
            destroy: destroy,

        };


        // Return the user factory
        return usersFactory;


        /*
        |--------------------------------------------------------------------------
        | Functions
        |--------------------------------------------------------------------------
        |
        | Declaring all functions used in the usersFactory
        |
        */
       

        // Display a listing of users.
        function index() {

            return $http.get(userBase)
                        .then(function(data){return data});

        };


        // Display a specified user.
        function show(id) {

            return $http.get(userBase + id)
                        .then(function(data){return data.data});

        };


        // Store a newly created user in storage.
        function store(data) {

            return $http.post(userBase, data)
                        .then(function(data){return data.data});

        };


        // Update the specified user in storage.
        function update(id, data) {

            return $http.put(userBase + id, data)
                        .then(function(data){return data.data});

        };


        // Remove the specified user from storage.
        function destroy(id) {

            return $http.delete(userBase + id)
                        .then(function(data){return data.data});

        };

    }

})();

(function() {

  'use strict';

    // Pass the usersMock to the app
	usersMock.$inject = ["mockHelper"];
	angular
	    .module('app')
	    .run(usersMock);


	// Define the usersMock
    function usersMock(mockHelper) {
        
        
		// Inject with ng-annotate
		"ngInject";


        // Object for user's mock
    	var users = {};


        /*
        |--------------------------------------------------------------------------
        | Contrsucts function
        |--------------------------------------------------------------------------
        |
        | All functions that should be init when the controller start
        |
        */

    	
    	setArrayUsers();																// Set the list of user
    	mockHelper.configureMocks(getMocks()); 											// Intercept all the api and add them to the httpBackend



	    /*
	    |--------------------------------------------------------------------------
	    | Functions
	    |--------------------------------------------------------------------------
	    |
	    | Declaring all functions used in the usersMock
	    |
	    */


		// Function for destroy users API
		function destroyRespond(method, url, data, headers, params) {

			//users.splice(0,1);
			console.log(params);
			// Get a random header
			var header = randomHeader();

			// If the result will be 200, execute the operation
			if(header == 200) {

				// Return the success header
				return [header, {data: 'yes'}];
			}

			// Return the error header
			return [header, {error:'error'}];
		}


		// Function for index users API
		function indexRespond(method, url, data, headers, params) {

			// Get a random header
			var header = randomHeader();

			// If the result will be 200, execute the operation
			if(header == 200) {

				// Return the success header
				return [header, {data: users}];
			}

			// Return the error header
			return [header, {error:'error'}];
		}


		// Function for show users API
		function showRespond(method, url, data, headers, params) {

			// Get a random header
			var header = randomHeader();

			// If the result will be 200, execute the operation
			if(header == 200) {

				// Get the data to return
				var user = users[1];

				// Return the success header
				return [header, {data: user}];
			}

			// Return the error header
			return [header, {error:'error'}];
		}


		// Function for store users API
		function storeRespond(method, url, data, headers, params) {

			// Get a random header
			var header = randomHeader();

			// If the result will be 200, execute the operation
			if(header == 200) {

				// Return the success header
				return [header, {data: 'yes'}];
			}

			// Return the error header
			return [header, {error:'error'}];
		}


		// Function for update users API
		function updateRespond(method, url, data, headers, params) {

			// Get a random header
			var header = randomHeader();

			// If the result will be 200, execute the operation
			if(header == 200) {

				// Return the success header
				return [header, {data: 'yes'}];
			}

			// Return the error header
			return [header, {error:'error'}];
		}


		// Basic algorithm for random headers 
		function randomHeader(){

			// Generate a random number from 1 to 10
			var random = Math.floor((Math.random() * 10) + 1);

			// Return 500 if random is 10
			if(random == 10) {

				return 500;
			}

			// Return 404 if random is 9
			if(random == 9) {

				return 404;
			}

			// Return 200
			return 200;
		}


		// Function that pass the array that will create the httpBackend
	    function getMocks() {

	    	// Object to pass for fake API
			return [{

				label: 'destroy',
			    method: 'DELETE',
			    url: /\/api\/v1\/users\/(d*)/, //  Why '/api/v1/users/:id' not works here!?
			    params: ['id'],
			    respond: destroyRespond
			
			},{

				label: 'index',
			    method: 'GET',
			    url: '/api/v1/users/',
			    respond: indexRespond
			
			},{

				label: 'show',
			    method: 'GET',
			    url: /\/api\/v1\/users\/(d*)/, //  Why '/api/v1/users/:id' not works here!?
			    params: ['id'],
			    respond: showRespond
			
			},{

				label: 'store',
			    method: 'POST',
			    url: '/api/v1/users/',
			    respond: storeRespond
			
			},{

				label: 'update',
			    method: 'PUT',
			    url: /\/api\/v1\/users\/(d*)/, //  Why '/api/v1/users/:id' not works here!?
			    params: ['id'],
			    respond: updateRespond
			}];
		}


		// Fucntion for set the array 
		function setArrayUsers() {

			return users = [{name: 'A'}, {name: 'B'}, {name: 'C'}];
		}
	}

})();
(function() {

  'use strict';

    // Pass the usersRoute to the app
    usersRoute.$inject = ["routerHelper"];
	angular
	    .module('app')
	    .run(usersRoute);


	// Define the usersRoute
    function usersRoute(routerHelper) {


		// Inject with ng-annotate
		"ngInject";


    	// Intercept all the states and add them to the routing
    	routerHelper.configureStates(getStates());
    }


    // Define the getStates
    function getStates() {

		return [{
			
		    state: 'users-index',
		    config: {
		        url: '/users',
		        templateUrl: 'App/Users/index/users.indexView.html',
		        controller: 'usersIndexCtrl',
		        controllerAs: 'usersIndex'
		    }
		}, {
		    state: 'users-store',
		    config: {
		        url: '/users/store',
		        templateUrl: 'App/Users/store/users.storeView.html',
		        controller: 'usersStoreCtrl',
		        controllerAs: 'usersStore'
		    }
		}, {
		    state: 'users-show',
		    config: {
		        url: '/users/:id',
		        templateUrl: 'App/Users/show/users.showView.html',
		        controller: 'usersShowCtrl',
		        controllerAs: 'usersShow'
		    }
		}, {
		    state: 'users-update',
		    config: {
		        url: '/users/:id/update',
		        templateUrl: 'App/Users/update/users.updateView.html',
		        controller: 'usersUpdateCtrl',
		        controllerAs: 'usersUpdate'
		    }
		}, {
		    state: 'users-destroy',
		    config: {
		        url: '/users/:id/delete',
		        templateUrl: 'App/Users/destroy/users.destroyView.html',
		        controller: 'usersDestroyCtrl',
		        controllerAs: 'usersDestroy'
		    }
		}]
	}

})();

(function() {

  'use strict';

    // Pass the usersDestroyCtrl to the app
    usersDestroyCtrl.$inject = ["usersFactory", "$stateParams"];
    angular
        .module('app')
        .controller('usersDestroyCtrl', usersDestroyCtrl);

    
    // Define the usersDestroyCtrl
    function usersDestroyCtrl(usersFactory, $stateParams) {


        // Inject with ng-annotate
        "ngInject";

        
        // Define usersDestroy as this for ControllerAs and auto-$scope
        var usersDestroy = this;


        // Define the usersDestroy functions that will be passed to the view
        usersDestroy.user = {};                                                 // Object for show the user
        usersDestroy.destroy = destroy;                                         // Delete a resource


        /*
        |--------------------------------------------------------------------------
        | Contrsucts function
        |--------------------------------------------------------------------------
        |
        | All functions that should be init when the controller start
        |
        */
        

        initLog();
        show($stateParams.id);


        /*
        |--------------------------------------------------------------------------
        | Functions
        |--------------------------------------------------------------------------
        |
        | Declaring all functions used in the usersDestroyCtrl
        |
        */
       

        // Sample for init function
        function initLog() {

            console.log('usersDestroyCtrl init');
        }


        // Delete a resource
        function destroy(id) {

            return usersFactory.destroy(id).then(function(data) {

                // Custom function for success handling
            	console.log('Custom success function goes here');

            }, function(data) {

            	// Custom function for error handling
				console.log('Custom error function goes here');

            });
        };


        // Get the user
        function show(id) {

            return usersFactory.show(id).then(function(data) {

                // Assign data to array and return them
                usersFactory.user = data;
                return usersShow.user;

            }, function(data) {

                // Custom function for error handling
                console.log('Custom error function goes here');

            });
        };
    }

})();

(function() {

  'use strict';

    // Pass the usersIndexCtrl to the app
    usersIndexCtrl.$inject = ["usersFactory"];
    angular
        .module('app')
        .controller('usersIndexCtrl', usersIndexCtrl);


    // Define the usersIndexCtrl
    function usersIndexCtrl(usersFactory) {


        // Inject with ng-annotate
        "ngInject";


        // Define usersIndex as this for ControllerAs and auto-$scope
        var usersIndex = this;


        // Define the usersIndex functions that will be passed to the view
        usersIndex.users = [];                                              // Array for list of users


        /*
        |--------------------------------------------------------------------------
        | Contrsucts function
        |--------------------------------------------------------------------------
        |
        | All functions that should be init when the controller start
        |
        */
        

        initLog();
        index()

        /*
        |--------------------------------------------------------------------------
        | Functions
        |--------------------------------------------------------------------------
        |
        | Declaring all functions used in the usersIndexCtrl
        |
        */
       

        // Sample for init function
        function initLog() {

            console.log('usersIndexCtrl init');
        }


        // Get all users.
        function index() {

            return usersFactory.index().then(function(data) {

            	// Assign data to array and return them
	            usersFactory.users = data.data;
	            return usersIndex.users;

            }, function(data) {

                // Custom function for error handling
                console.log('Custom error function goes here', data);

            });
        };
    }

})();

(function() {

  'use strict';

    // Pass the usersStoreCtrl to the app
    usersStoreCtrl.$inject = ["usersFactory"];
    angular
        .module('app')
        .controller('usersStoreCtrl', usersStoreCtrl);

    
    // Define the usersStoreCtrl
    function usersStoreCtrl(usersFactory) {


        // Inject with ng-annotate
        "ngInject";


        // Define usersStore as this for ControllerAs and auto-$scope
        var usersStore = this;


        // Define the usersStore functions that will be passed to the view
        usersStore.store = store;                                           // Store a resource


        /*
        |--------------------------------------------------------------------------
        | Contrsucts function
        |--------------------------------------------------------------------------
        |
        | All functions that should be init when the controller start
        |
        */
        

        initLog();


        /*
        |--------------------------------------------------------------------------
        | Functions
        |--------------------------------------------------------------------------
        |
        | Declaring all functions used in the usersStoreCtrl
        |
        */
       

        // Sample for init function
        function initLog() {

            console.log('usersStoreCtrl init');
        }


        // Delete a resource
        function store(data) {

            return usersFactory.store(data).then(function(data) {

                // Custom function for success handling
            	console.log('Custom success function goes here');

            }, function(data) {

            	// Custom function for error handling
				console.log('Custom error function goes here');

            });
        };
    }

})();

(function() {

  'use strict';

    // Pass the usersShowCtrl to the app
    usersShowCtrl.$inject = ["usersFactory", "$stateParams"];
    angular
        .module('app')
        .controller('usersShowCtrl', usersShowCtrl);

    
    // Define the usersShowCtrl
    function usersShowCtrl(usersFactory, $stateParams) {


        // Inject with ng-annotate
        "ngInject";


        // Define usersShow as this for ControllerAs and auto-$scope
        var usersShow = this;


        // Define the usersShow functions that will be passed to the view
        usersShow.user = {};                                                // Object for show the user
        

        /*
        |--------------------------------------------------------------------------
        | Contrsucts function
        |--------------------------------------------------------------------------
        |
        | All functions that should be init when the controller start
        |
        */
        

        initLog();
        show($stateParams.id);


        /*
        |--------------------------------------------------------------------------
        | Functions
        |--------------------------------------------------------------------------
        |
        | Declaring all functions used in the usersShowCtrl
        |
        */
       

        // Sample for init function
        function initLog() {

            console.log('usersShowCtrl init');
        }


        // Get the user
        function show(id) {

            return usersFactory.show(id).then(function(data) {

            	// Assign data to array and return them
	            usersFactory.user = data;
	            return usersShow.user;

            }, function(data) {

                // Custom function for error handling
                console.log('Custom error function goes here');

            });
        };
    }

})();

(function() {

  'use strict';

    // Pass the usersUpdateCtrl to the app
    usersUpdateCtrl.$inject = ["usersFactory", "$stateParams"];
    angular
        .module('app')
        .controller('usersUpdateCtrl', usersUpdateCtrl);

    
    // Define the usersUpdateCtrl
    function usersUpdateCtrl(usersFactory, $stateParams) {


        // Inject with ng-annotate
        "ngInject";


        // Define usersUpdate as this for ControllerAs and auto-$scope
        var usersUpdate = this;


        // Define the usersUpdate functions that will be passed to the view
        usersUpdate.user = {};                                                  // Object for show the user
        usersUpdate.update = update;                                            // Update a resource


        /*
        |--------------------------------------------------------------------------
        | Contrsucts function
        |--------------------------------------------------------------------------
        |
        | All functions that should be init when the controller start
        |
        */
        

        initLog();
        show($stateParams.id);
        

        /*
        |--------------------------------------------------------------------------
        | Functions
        |--------------------------------------------------------------------------
        |
        | Declaring all functions used in the usersUpdateCtrl
        |
        */
       

        // Sample for init function
        function initLog() {

            console.log('usersUpdateCtrl init');
        }


        // Delete a resource
        function update(id, data) {

            return usersFactory.update(id, data).then(function(data) {

                // Custom function for success handling
            	console.log('Custom success function goes here');

            }, function(data) {

            	// Custom function for error handling
				console.log('Custom error function goes here');

            });
        };


        // Get the user
        function show(id) {

            return usersFactory.show(id).then(function(data) {

                // Assign data to array and return them
                usersFactory.user = data;
                return usersShow.user;

            }, function(data) {

                // Custom function for error handling
                console.log('Custom error function goes here');

            });
        };
    }

})();

(function(){

	'use strict';

	// Pass the mockHelperProvider to the app
	angular
		.module('core.mocking')
		.provider('mockHelper', mockHelperProvider);


    // Define the mockHelperProvider
	function mockHelperProvider() {

		// Holds the service factory function
		MockHelper.$inject = ["$httpBackend"];
		this.$get = MockHelper;


		// Define the mockHelperProvider
		function MockHelper($httpBackend) {

			// Inject with ng-annotate
			"ngInject";

			$httpBackend.whenGET(/\.html$/).passThrough();
			$httpBackend.whenGET(/\.png$/).passThrough();
			$httpBackend.whenGET(/\.svg$/).passThrough();
			$httpBackend.whenGET(/\.jpg$/).passThrough();
			$httpBackend.whenGET(/\.jpeg$/).passThrough();
			$httpBackend.whenGET(/\.css$/).passThrough();

			// Define the object to return
			var service = {

				configureMocks: configureMocks,		// Configure all the states for the route
			};


			// Return the object
			return service;


	        /*
	        |--------------------------------------------------------------------------
	        | Functions
	        |--------------------------------------------------------------------------
	        |
	        | Declaring all functions used in the MockHelper
	        |
	        */
	       

			// Configure all the mocks for the route
			function configureMocks(mocks) {

				// Foreach mocks, create a fake backend interaction
				mocks.forEach(function(mock){

					console.log(mock);
					$httpBackend.when(mock.method, mock.url).respond(mock.respond);
				});
			}
		}
	}

})();
(function(){

	'use strict';

	// Pass the routerHelperProvider to the app
	routerHelperProvider.$inject = ["$locationProvider", "$stateProvider", "$urlRouterProvider"];
	angular
		.module('core.routing')
		.provider('routerHelper', routerHelperProvider);


    // Define the routerHelperProvider
	function routerHelperProvider($locationProvider, $stateProvider, $urlRouterProvider) {

		// Inject with ng-annotate
		"ngInject";

		// Holds the service factory function
		RouterHelper.$inject = ["$state"];
		this.$get = RouterHelper;

		// Declare html5Mode true for a clean url
		$locationProvider.html5Mode(true);


		// Declare the otherwise, go here if no state is found
		$urlRouterProvider.otherwise('/404');


		// Define the routerHelperProvider
		function RouterHelper($state) {


			// Inject with ng-annotate
			"ngInject";
		

			// Define the object to return
			var service = {

				configureStates: configureStates,		// Configure all the states for the route
				getStates: getStates 					// Return the lists of states

			};


			// Return the object
			return service;


	        /*
	        |--------------------------------------------------------------------------
	        | Functions
	        |--------------------------------------------------------------------------
	        |
	        | Declaring all functions used in the RouterHelper
	        |
	        */
	       

			// Configure all the states for the route
			function configureStates(states) {

				// Add to the routing the state passed trought array of objects
				states.forEach(function(state) {
					
					$stateProvider.state(state.state, state.config);

				});
			}


			// Return the lists of states
			function getStates() {

				return $state.get();

			}
		}
	}

})();