const observableModule = require("@nativescript/core/data/observable");
const camera = require("nativescript-camera");
let check = false;

function createViewModel() {
    const viewModel = new observableModule.fromObject({
        takePicture(result) {
            camera.requestPermissions().then(
                () => this.capture(),
                () => alert("Permissions rejected")
            );
        },
        capture() {
            // See the options at https://github.com/NativeScript/nativescript-camera#using-the-options-to-take-memory-efficient-picture
            // for more information on how to customize the pictures you take.
            camera.takePicture({ height: 300, keepAspectRatio: false })
                .then((imageAsset) => {
                    viewModel.set("cameraImage", imageAsset);
                    check = true;
                }, (error) => {
                    console.log("Error taking picture");
                    console.log(error);
                });
        },
        getText() {
            if (!check) {
                alert("Take a picture to extract text");
                alert(viewModel.get("cameraImage"));
            } else {
                alert(viewModel.get("cameraImage"));
            }

        }
    });


    return viewModel;
}

exports.createViewModel = createViewModel;