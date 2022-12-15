import grapesjs from "grapesjs";

if (window != undefined) {
  window.grapesjs = grapesjs;
  const loadEventGrapesjs = (el) => {
    el?.querySelectorAll(".el-builder").forEach((elItem) => {
      const wireElent = elItem.closest("[wire\\:id]");
      if (wireElent) {
        const wireComponent =
          livewire.components.componentsById[wireElent.getAttribute("wire:id")];
        const fromElement = wireComponent.data.fromElement;
        const ListBlocks = wireComponent.data.ListBlocks;
        const DataBuilderJson = wireComponent.data.DataBuilderJson ?? {};

        const editor = grapesjs.init({
          // Indicate where to init the editor. You can also pass an HTMLElement
          container: elItem,
          fromElement: fromElement ?? false,
          storageManager: false,
          assetManager: {
            custom: {
              open(props) {
                window.ShowFileManager((path) => {
                  props.select(path.url);
                });
              },
            },
          },
          blockManager: {
            //appendTo: "#blocks",
            blocks: ListBlocks,
          },
        });
        editor.on("change:changesCount", (e) => {
          console.log(e);

          console.log(editor.getProjectData());
          // Change!
        });
        editor.Panels.addButton("options", [
          {
            id: "save",
            className: "fa fa-floppy-o icon-blank",
            command: function (editor1, sender) {
              wireComponent.set(
                "DataBuilderJson",
                editor1.getProjectData(),
                true
              );
              wireComponent.set("DataBuilderHtml", editor1.getHtml(), true);
              wireComponent.set("DataBuilderCss", editor1.getCss(), true);
              wireComponent.set("DataBuilderJs", editor1.getJs(), true);
              wireComponent.$wire["DoSave"]();
              alert("save Done");
            },
          },
        ]);
        if (DataBuilderJson) editor.loadProjectData(DataBuilderJson);
      }
    });
  };
  window.addEventListener("load", function () {
    loadEventGrapesjs(document.body);
    Livewire.hook("message.processed", (message, component) => {
      loadEventGrapesjs(component.el);
    });
  });
  window.addEventListener("loadComponent", function ({ detail }) {
    loadEventGrapesjs(detail);
  });
}

// const editor = grapesjs.init({
//   // Indicate where to init the editor. You can also pass an HTMLElement
//   container: "#gjs",
//   // Get the content for the canvas directly from the element
//   // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
//   fromElement: true,
//   // Size of the editor
//   height: "700px",
//   width: "auto",
//   // Disable the storage manager for the moment
//   //   storageManager: false,
//   // Avoid any default panel
//   //   panels: { defaults: [] },
//   assetManager: {
//     custom: {
//       open(props) {
//         window.ShowFileManager((path) => {
//           props.select(path.url);
//         });
//       },
//     },
//   },
//   blockManager: {
//     //appendTo: "#blocks",
//     blocks: [
//       {
//         category: "Basic",
//         id: "image",
//         label: "Image",
//         media: `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
//                 <path d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z" />
//             </svg>`,
//         // Use `image` component
//         content: { type: "image" },
//         // The component `image` is activatable (shows the Asset Manager).
//         // We want to activate it once dropped in the canvas.
//         activate: true,
//         // select: true, // Default with `activate: true`
//       },
//       {
//         id: "section", // id is mandatory
//         category: "Basic",
//         label: "<b>Section</b>", // You can use HTML/SVG inside labels
//         attributes: { class: "gjs-block-section" },
//         content: `<section>
//           <h1>This is a simple title</h1>
//           <div>This is just a Lorem text: Lorem ipsum dolor sit amet</div>
//         </section>`,
//       },
//       {
//         id: "text",
//         category: "Form",
//         label: "Text",
//         content: '<div data-gjs-type="text">Insert your text here</div>',
//       },
//       {
//         id: "image",
//         category: "Basic",
//         label: "Image",
//         // Select the component once it's dropped
//         select: true,
//         // You can pass components as a JSON instead of a simple HTML string,
//         // in this case we also use a defined component type `image`
//         content: { type: "image" },
//         // This triggers `active` event on dropped components and the `image`
//         // reacts by opening the AssetManager
//         activate: true,
//       },
//     ],
//   },
// });
