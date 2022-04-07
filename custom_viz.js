looker.plugins.visualizations.add({
    create: function(element, config) {
        var css = element.innerHTML = `
            <style>
              .hello-world-vis {
                  height: 100%;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  text-align: center;
              }
        `;

        var container = element.appendChild(document.createElement("div"));
        container.className = "hello-world-vis";

        this._textElement = container.appendChild(document.createElement("div"));
    },
    updateAsync: function(data, element, config, queryResponse, details, done) {
        console.log("Tyler! This is updating!");

        this.clearErrors();

        if (queryResponse.fields.dimensions.length === 0) {
            this.addError({title: "No Dimensions", message: "This chart requires dimensions."});
            return;
        }

        var firstRow = data[0];
        var firstCell = firstRow[queryResponse.fields.dimensions[0].name];

        this._textElement.innerHTML = LookerCharts.Utils.htmlForCell(firstCell);

        done()
    }
})