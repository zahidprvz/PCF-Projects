import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class standardfield implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private _inputElement: HTMLInputElement;
    private _notifyOutputChanged: () => void;

    /**
     * Empty constructor.
     */
    constructor() {
        // Empty
    }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * @param context The entire property bag available to control via Context Object.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready.
     * @param state A piece of data that persists in one session for a single user.
     * @param container If control-type='standard', receives an empty div element to render content.
     */
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement
    ): void {
        const button: HTMLButtonElement = document.createElement("button");
        button.innerText = "Click Me";

        button.addEventListener("click", () => {

             // hard Code Value Showing in Alert

            // // const DisplayValue = `User Name: ${context.userSettings.userName}, User ID: ${context.userSettings.userId}`;

            // // const alertStrings = {
            // //     confirmButtonLabel: "OK",
            // //     text: DisplayValue,
            // //     title: "Hello World Title!"
            // // };
            // // const alertOptions = { height: 200, width: 400 };

            // // context.navigation.openAlertDialog(alertStrings, alertOptions)
            // //     .then(() => {
            // //         console.log("Alert Dialog Closed");
            // //         return null; // Ensures ESLint's `promise/always-return` rule is satisfied
            // //     })
            // //     .catch(() => {
            // //         console.log("Error Occurred");
            // //     });

            // navigation to a specific URL

            // const urlOptions = { height: 300, width: 400 };
            // context.navigation.openUrl("https://www.bing.com", urlOptions);
            

            console.log("Create Record");
            
            context.webAPI.createRecord("account", { name: "Sample Account PCF Test" })
                .then((entity) => {
                    console.log("Account created with ID:", entity.id);
                    return null; // ✅ Ensures ESLint's `promise/always-return` rule is satisfied
                })
                .catch((error) => {
                    console.log(error.message);
                });

            console.log("Retrieve Multiple Records");
            
            context.webAPI.retrieveMultipleRecords("account", "?$select=name")
                .then((records) => {
                    records?.entities?.forEach((record) => {
                        console.log(record.name);
                    });
                    return null; // ✅ Ensures ESLint's `promise/always-return` rule is satisfied
                })
                .catch((error) => {
                    console.log(error.message);
                });
        });

        container.appendChild(button);
    }

    /**
     * Called when any value in the property bag has changed.
     * @param context The entire property bag available to the control.
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void {
        // Add code to update control view
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object with bound or output properties.
     */
    public getOutputs(): IOutputs {
        console.log("getOutputs");
        return {};
    }

    /**
     * Called when the control is to be removed from the DOM tree.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}
