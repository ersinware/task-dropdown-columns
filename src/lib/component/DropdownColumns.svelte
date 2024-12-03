<script>
    import {onMount} from "svelte";
    import {EVENT_CLOSE_DROPDOWN_COLUMNS, EVENT_OPEN_DROPDOWN_COLUMNS} from "$lib/js/contants.events.js";
    import {fly} from "svelte/transition";
    import {cubicInOut} from "svelte/easing";

    const { inputId, dataURL } = $props()

    let show = $state.raw(),
        data,
        x,
        y

    onMount(() => {
        window.addEventListener(
            EVENT_OPEN_DROPDOWN_COLUMNS,
            async event => {
                // TODO: error handling
                const response = await fetch(dataURL)
                data = await response.json()

                x = event.detail.x
                y = event.detail.y

                show = true
            }
        )

        window.addEventListener(
            EVENT_CLOSE_DROPDOWN_COLUMNS,
            () => show = false
        )

        document.addEventListener('click', () => show = false)
    })

    function handleSelection(event) {
        const textbox = document.getElementById(inputId)
        textbox.innerHTML = textbox.innerHTML.replace(
            /\/$/,
            getBadge(event.currentTarget.innerText, event.currentTarget.getAttribute('data-value')) + '&nbsp;'
        )

        setCaretToEnd()
    }

    function getBadge(text) {
        return `<span class="badge" contenteditable="false">${text}</span>`
    }

    function setCaretToEnd() {
        const range = document.createRange(),
            lastChild = document.getElementById(inputId).lastChild;

        range.setStart(lastChild, lastChild.nodeType === 3 ? lastChild.length : lastChild.childNodes.length);
        range.collapse(true);

        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    }
</script>

{#if show}
    <ul style:top="{y}px"
        style:left="{x}px"
        class="dropdown"
        transition:fly={{y: '.5rem', easing: cubicInOut}}>

        {#each data as column}
            <li>
                <button data-value={column.value}
                        onclick={handleSelection}>
                    {column.name}
                </button>
            </li>
        {:else}
            <li class="text-no-data">No Data <br> Available</li>
        {/each}
    </ul>
{/if}

<style>
    .dropdown {
        position: absolute;

        background-color: rgb(247, 247, 247);

        padding: 0;

        font-size: .75rem;

        list-style: none;
        border-radius: .75rem;
    }

    button {
        padding: .375rem 1rem;
    }

    .dropdown li:first-of-type {
        padding-top: .75rem;
    }

    .dropdown li:last-of-type {
        padding-bottom: .75rem;
    }

    .text-no-data {
        padding: 1rem;
    }

    @media (hover: hover) {
        button {
            transition: color .25s ease-in-out;
        }

        button:hover {
            color: steelblue;
        }
    }
</style>