var main = new Vue({
    el: '#main',
    data: {
        members: [],
        republicanChecked: true,
        democratChecked: true,
        independentChecked: true,
        selected: ["All States"],
        states: [],
        membersObject: {},
        showLoader: true,
        noDataInTable: false,
        buttonText: "Read More"
    },
    created: function () {
        if (location.pathname == "/senate-starter-page.html") {
            var url = "https://api.propublica.org/congress/v1/113/senate/members.json"
            this.getDataObject(url)
        }
        if (location.pathname == "/house-starter-page.html") {
            var url = "https://api.propublica.org/congress/v1/113/house/members.json"
            this.getDataObject(url)
            
        }
    },
    methods: {
        filterClicked: function () {
            main.fillArrays(main.membersObject)
        },
        changeButtonText: function () {
            if (main.buttonText == "Read More") {
                main.buttonText = "Read Less"
            } else {
                main.buttonText = "Read More"
            }
        },
        createStateSelector: function(input) {
            var membersData = input.results[0].members
            for (i = 0; i < membersData.length; i++) {
                if (!main.states.includes(membersData[i].state)) {
                    main.states.push(membersData[i].state)
                }
            }
            main.states.sort()
            main.states.splice(0,0, "All States")
        },
        fillArrays: function (input) {
            main.members = []
            var membersData = input.results[0].members
            for (i = 0; i < membersData.length; i++) {
                if (membersData[i].state == main.selected || main.selected == "" || main.selected == "All States") {
                    if (membersData[i].party == "R" && main.republicanChecked == true) {
                        main.members.push(membersData[i])
                    }
                    if (membersData[i].party == "D" && main.democratChecked == true) {
                        main.members.push(membersData[i])
                    }
                    if (membersData[i].party == "I" && main.independentChecked == true) {
                        main.members.push(membersData[i])
                    }
                }
            }
            if (main.members.length == 0) {
                main.noDataInTable = true
            } else {
                main.noDataInTable = false
            }
        },
        getDataObject: function (url) {
            var fetchConfig =
                fetch(url, {
                    method: "GET",
                    headers: new Headers({
                        "X-API-Key": 'zsEvmuXnU2Ujx5CmBxuVC3emA4n9i82ZgzTwiwf2'
                    })
                })
            .then(this.onDataFetched)
               
        },
        onConversionToJsonSuccessful: function (json) {
            main.showLoader = false
            main.membersObject = json;
            main.createStateSelector(main.membersObject)
            main.fillArrays(main.membersObject)
           
        },
        onDataFetched: function (response) {
            response.json()
                .then(main.onConversionToJsonSuccessful)
        }
    }
});
        
