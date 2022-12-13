<?php

namespace GateGem\Builder\Http\Livewire\Builder;

use GateGem\Core\Facades\Theme;
use GateGem\Core\Livewire\Component;

class Index extends Component
{
    public function boot()
    {
        Theme::setLayout('none');
    }
    public function render()
    {
        return <<<'blade'
            <div>
                <div id="gjs">
                    <h1>Hello World Component!</h1>
                </div>
                <div id="blocks"></div>
            </div>
        blade;
    }
}
