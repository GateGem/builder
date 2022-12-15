<?php

namespace GateGem\Builder\Traits;

use GateGem\Core\Facades\Theme;
use Illuminate\Support\Facades\Log;

trait WithPageBuilder
{
    public $DataBuilderJson;
    public $DataBuilderHtml;
    public $DataBuilderCss;
    public $DataBuilderJs;
    public $BuilderName;
    public $fromElement = true;

    public $ListBlocks = [
        [
            'id' => 'text',
            'label' => 'Text',
            'media' =>  '<svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z" />
            </svg>',
            'content' => '<div data-gjs-type="text">Insert your text here</div>'
        ],
        [
            'id' => 'image',
            'label' => 'Image',
            // Select the component once it's dropped
            'select' => true,
            // You can pass components as a JSON instead of a simple HTML string,
            // in this case we also use a defined component type `image`
            'content' => ['type' => 'image'],
            // This triggers `active` event on dropped components and the `image`
            // reacts by opening the AssetManager
            'activate' => true,
        ]
    ];
    public function boot()
    {
        Theme::setLayout('none');
    }
    public function DoSave()
    {
        Log::info($this->DataBuilderJson);
        $this->showMessage($this->DataBuilderHtml);
    }
}
