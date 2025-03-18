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
     * Data-set values are not initialized here, use updateView.
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
            alert("Hello World!");

            const alertStrings = {
                confirmButtonLabel: "OK",
                text: "Hello World",
                title: "Hello World Title!"
            };
            const alertOptions = { height: 200, width: 400 };

            context.navigation.openAlertDialog(alertStrings, alertOptions)
                .then(() => {
                    console.log("Alert Dialog Closed");
                    return null; // Ensures ESLint's `promise/always-return` rule is satisfied
                })
                .catch(() => {
                    console.log("Error Occurred");
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
