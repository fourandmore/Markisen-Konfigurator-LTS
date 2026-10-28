<?php

namespace EclipseAwningConfigurator\Providers;

use EclipseAwningConfigurator\Widgets\AwningConfiguratorWidget;
use IO\Helper\ResourceContainer;
use Plenty\Modules\ShopBuilder\Contracts\ContentWidgetRepositoryContract;
use Plenty\Plugin\Events\Dispatcher;
use Plenty\Plugin\ServiceProvider;

class AwningServiceProvider extends ServiceProvider
{
    public function register()
    {
        // The widget uses the services supplied by Ceres and IO.
    }

    public function boot(Dispatcher $eventDispatcher)
    {
        /** @var ContentWidgetRepositoryContract $widgetRepository */
        $widgetRepository = pluginApp(ContentWidgetRepositoryContract::class);
        $widgetRepository->registerWidget(AwningConfiguratorWidget::class);

        // IO invokes this once when the page requests additional resources.
        // Template safe mode deliberately uses another event and is untouched.
        $eventDispatcher->listen('IO.Resources.Import', function (ResourceContainer $resources) {
            $resources->addStyleTemplate('EclipseAwningConfigurator::Assets.Styles');
            $resources->addScriptTemplate('EclipseAwningConfigurator::Assets.Scripts');
        });
    }
}
