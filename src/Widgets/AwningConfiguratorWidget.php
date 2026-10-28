<?php

namespace EclipseAwningConfigurator\Widgets;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\WidgetTypes;

class AwningConfiguratorWidget extends BaseWidget
{
    protected $template = 'EclipseAwningConfigurator::Widgets.AwningConfigurator';

    public function getData()
    {
        return WidgetDataFactory::make('EclipseAwningConfigurator::AwningConfigurator')
            ->withLabel('Widget.label')
            ->withPreviewImageUrl('/images/widget-preview.svg')
            ->withType(WidgetTypes::STATIC)
            ->withCategory(WidgetCategories::ITEM)
            ->withPosition(1800)
            ->withMaxPerPage(1)
            ->toArray();
    }

    public function getSettings()
    {
        return [
            'headline' => [
                'type' => 'text',
                'defaultValue' => 'Ihre Markise. Ihre Auswahl.',
                'options' => [
                    'name' => 'Widget.headlineLabel',
                    'tooltip' => 'Widget.headlineTooltip'
                ]
            ],
            'defaultModel' => [
                'type' => 'select',
                'defaultValue' => 'vollkassette',
                'options' => [
                    'name' => 'Widget.defaultModelLabel',
                    'tooltip' => 'Widget.defaultModelTooltip',
                    'listBoxValues' => [
                        ['value' => 'vollkassette', 'caption' => 'Widget.modelFull'],
                        ['value' => 'halbkassette', 'caption' => 'Widget.modelHalf'],
                        ['value' => 'gelenkarm', 'caption' => 'Widget.modelArm']
                    ]
                ]
            ],
            'useCurrentVariation' => [
                'type' => 'checkbox',
                'defaultValue' => true,
                'options' => [
                    'name' => 'Widget.useCurrentVariationLabel',
                    'tooltip' => 'Widget.useCurrentVariationTooltip'
                ]
            ],
            'allowModelSwitch' => [
                'type' => 'checkbox',
                'defaultValue' => true,
                'options' => [
                    'name' => 'Widget.allowModelSwitchLabel',
                    'tooltip' => 'Widget.allowModelSwitchTooltip'
                ]
            ],
            'showDescription' => [
                'type' => 'checkbox',
                'defaultValue' => true,
                'options' => [
                    'name' => 'Widget.showDescriptionLabel',
                    'tooltip' => 'Widget.showDescriptionTooltip'
                ]
            ],
            'showTechnical' => [
                'type' => 'checkbox',
                'defaultValue' => true,
                'options' => [
                    'name' => 'Widget.showTechnicalLabel',
                    'tooltip' => 'Widget.showTechnicalTooltip'
                ]
            ],
            'customClass' => [
                'type' => 'text',
                'defaultValue' => '',
                'options' => [
                    'name' => 'Widget.customClassLabel',
                    'tooltip' => 'Widget.customClassTooltip'
                ]
            ]
        ];
    }

    protected function getTemplateData($widgetSettings, $isPreview)
    {
        $model = $this->readSetting($widgetSettings, 'defaultModel', 'vollkassette');
        $modelKeys = [
            'vollkassette' => 'EclipseAwningConfigurator::Widget.modelFull',
            'halbkassette' => 'EclipseAwningConfigurator::Widget.modelHalf',
            'gelenkarm' => 'EclipseAwningConfigurator::Widget.modelArm'
        ];
        if (!is_string($model) || !isset($modelKeys[$model])) {
            $model = 'vollkassette';
        }

        $headline = $this->readSetting($widgetSettings, 'headline', 'Ihre Markise. Ihre Auswahl.');
        $customClass = $this->readSetting($widgetSettings, 'customClass', '');

        return [
            'eam' => [
                'headline' => is_string($headline) ? trim($headline) : '',
                'defaultModel' => $model,
                'modelLabelKey' => $modelKeys[$model],
                'useCurrentVariation' => $this->readBoolean($widgetSettings, 'useCurrentVariation', true),
                'allowModelSwitch' => $this->readBoolean($widgetSettings, 'allowModelSwitch', true),
                'showDescription' => $this->readBoolean($widgetSettings, 'showDescription', true),
                'showTechnical' => $this->readBoolean($widgetSettings, 'showTechnical', true),
                'customClass' => is_string($customClass)
                    ? trim(preg_replace('/[^a-zA-Z0-9_\-\s]/', '', $customClass)) : ''
            ]
        ];
    }

    private function readSetting($settings, $key, $default)
    {
        if (!array_key_exists($key, $settings)) {
            return $default;
        }
        $value = $settings[$key];
        if (is_array($value)) {
            return array_key_exists('mobile', $value) ? $value['mobile'] : $default;
        }
        return $value;
    }

    private function readBoolean($settings, $key, $default)
    {
        $value = $this->readSetting($settings, $key, $default);
        return $value === true || $value === 1 || $value === '1' || $value === 'true';
    }
}
