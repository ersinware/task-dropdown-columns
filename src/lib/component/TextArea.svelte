<script>
    import DropdownColumns from "$lib/component/DropdownColumns.svelte";
    import {EVENT_CLOSE_DROPDOWN_COLUMNS, EVENT_OPEN_DROPDOWN_COLUMNS} from "$lib/js/contants.events.js";

    const {inputId} = $props()

    function onInput(event) {
        if (event.target.innerText.endsWith('/')) {
            const selection = window.getSelection(),
                { x, y } = selection.getRangeAt(0).getBoundingClientRect()

            window.dispatchEvent(new CustomEvent(EVENT_OPEN_DROPDOWN_COLUMNS, { detail: { x, y } }))

            return
        }

        window.dispatchEvent(new CustomEvent(EVENT_CLOSE_DROPDOWN_COLUMNS))
    }
</script>

<div id={inputId}
     contenteditable="true"
     oninput={onInput}>
</div>

<DropdownColumns {inputId} dataURL="/api/get-columns"/>

<style>
    [contenteditable="true"] {
        width: 30rem;
        height: 15rem;
        line-height: 1.5rem;

        padding: 1.5rem;

        margin-top: 6rem;
        margin-left: auto;
        margin-right: auto;

        font-size: .85rem;

        border: .1rem solid rgb(239, 239, 239);
        border-radius: 1.5rem;
    }

    [contenteditable]:focus {
        border: .1rem solid steelblue;
    }
</style>