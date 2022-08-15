@component('mail::message')
{{-- Greeting --}}
@if (! empty($greeting))
# {{ $greeting }}
@else
@if ($level === 'error')
# @lang('Whoops!')
@else
# @lang('Hai!')
@endif
@endif

{{-- Intro Lines --}}
@lang('Kamu Nerima Email ini karena kami dapet info kamu mau reset password ya? klik tombol dibawah ini untuk reset
password kamu.')

{{-- Action Button --}}

{{-- Action Button --}}
@isset($actionText)
<?php
    $color = match ($level) {
        'success', 'error' => $level,
        default => 'primary',
    };
?>
@component('mail::button', ['url' => $actionUrl, 'color' => $color])
{{ $actionText }}
@endcomponent
@endisset

{{-- Outro Lines --}}
@lang('Kalo kamu ga merasa minta untuk reset password abaikan aja ya.')

{{-- Salutation --}}

{{-- Salutation --}}
@if (! empty($salutation))
{{ $salutation }}
@else
@lang('Salam'),<br>
{{ config('app.author') }}
@endif

{{-- Subcopy --}}
@isset($actionText)
@slot('subcopy')
@lang(
"Kalo Kamu Kesulitan dengan \":actionText\" , copy dan paste URL dibawah ini\n".
'ke browser kamu ya:',
[
'actionText' => $actionText,
]
) <span class="break-all">[{{ $displayableActionUrl }}]({{ $actionUrl }})</span>
@endslot
@endisset
@endcomponent
