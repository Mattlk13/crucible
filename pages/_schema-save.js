function process(obj) {
    var out = [];

    Object.keys(obj).forEach(function(name) {
        var field = obj[name];

        if(typeof field !== "object") {
            field = {
                type : field
            };
        }

        field.name = name;

        if(field.type === "tabs") {
            field.tabs = Object.keys(field.tabs).map(function(tabName) {
                var tab = field.tabs[tabName];

                return {
                    name : tabName,
                    children : process(tab)
                };
            });
        }

        if(field.type === "repeating") {
            field.children = process(field.fields);

            delete field.fields;
        }

        if(field.type === "fieldset") {
            field.children = process(field.fields);

            delete field.fields;
        }

        if(field.type === "select") {
            field.children = Object.keys(field.options).map(function(name) {
                var details = field.options[name];

                return {
                    name  : name,
                    value : details.value || details,
                    selected : details.selected || false
                };
            });

            delete field.options;
        }

        out.push(field);
    });

    return out;
}

// This worker takes the nice, human-friendly config format and turns it into
// ugly arrays of objects for firebase
self.onmessage = function(e) {
    var config;

    try {
        // This is super-gross but in a worker should be (mostly) safe
        eval("config = " + e.data);
    } catch(e) {
        return;
    }

    self.postMessage(process(config));
};
