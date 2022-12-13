import grapesjs from "grapesjs";
// import options from './config';
const editor = grapesjs.init({
  // Indicate where to init the editor. You can also pass an HTMLElement
  container: "#gjs",
  // Get the content for the canvas directly from the element
  // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
  fromElement: true,
  // Size of the editor
  height: "700px",
  width: "auto",
  // Disable the storage manager for the moment
  //   storageManager: false,
  // Avoid any default panel
  //   panels: { defaults: [] },
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
    blocks: [
      {
        category: "Basic",
        id: "image",
        label: "Image",
        media: `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z" />
            </svg>`,
        // Use `image` component
        content: { type: "image" },
        // The component `image` is activatable (shows the Asset Manager).
        // We want to activate it once dropped in the canvas.
        activate: true,
        // select: true, // Default with `activate: true`
      },
      {
        id: "section", // id is mandatory
        category: "Basic",
        label: "<b>Section</b>", // You can use HTML/SVG inside labels
        attributes: { class: "gjs-block-section" },
        content: `<section>
          <h1>This is a simple title</h1>
          <div>This is just a Lorem text: Lorem ipsum dolor sit amet</div>
        </section>`,
      },
      {
        id: "text",
        category: "Form",
        label: "Text",
        content: '<div data-gjs-type="text">Insert your text here</div>',
      },
      {
        id: "image",
        category: "Basic",
        label: "Image",
        // Select the component once it's dropped
        select: true,
        // You can pass components as a JSON instead of a simple HTML string,
        // in this case we also use a defined component type `image`
        content: { type: "image" },
        // This triggers `active` event on dropped components and the `image`
        // reacts by opening the AssetManager
        activate: true,
      },
    ],
  },
});
