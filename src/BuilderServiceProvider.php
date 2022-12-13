<?php

namespace GateGem\Builder;

use Illuminate\Support\ServiceProvider;
use GateGem\Core\Support\Core\ServicePackage;
use GateGem\Core\Traits\WithServiceProvider;
use GateGem\Core\Builder\Menu\MenuBuilder;

class BuilderServiceProvider extends ServiceProvider
{
    use WithServiceProvider;

    public function configurePackage(ServicePackage $package): void
    {
        /*
         * This class is a Package Service Provider
         *
         */
        $package
            ->name('builder')
            ->hasConfigFile()
            ->hasViews()
            ->hasHelpers()
            ->hasAssets()
            ->hasTranslations()
            ->runsMigrations();
    }
    public function extending()
    {
    }
    public function registerMenu()
    {
          add_menu_with_sub(function ($subItem) {
            $subItem
                ->addItem('builder::menu.sidebar.feature1', 'bi bi-speedometer', '', ['name' => 'core.table.slug', 'param' => ['module' => 'feature1']], MenuBuilder::ItemRouter)
                ->addItem('builder::menu.sidebar.feature2', 'bi bi-speedometer', '', ['name' => 'core.table.slug', 'param' => ['module' => 'feature2']], MenuBuilder::ItemRouter)
                ->addItem('builder::menu.sidebar.feature3', 'bi bi-speedometer', '', ['name' => 'core.table.slug', 'param' => ['module' => 'feature3']], MenuBuilder::ItemRouter);
        }, 'builder::menu.sidebar.feature',  'bi bi-speedometer');
    }
    public function packageRegistered()
    {
        $this->registerMenu();
        $this->extending();
    }
    private function bootGate()
    {
        if (!$this->app->runningInConsole()) {
            add_filter('core_auth_permission_custom', function ($prev) {
                return [
                    ...$prev
                ];
            });
        }
    }
    public function packageBooted()
    {
        $this->bootGate();
    }
}
