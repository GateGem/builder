<?php

namespace GateGem\Builder\Http\Livewire\Builder;

use GateGem\Builder\Traits\WithPageBuilder;
use GateGem\Core\Livewire\Component;

class Index extends Component
{
    use WithPageBuilder;
    public function render()
    {
        return <<<'blade'
            <div>
                <div class="el-builder">
                </div>
            </div>
        blade;
    }
}
