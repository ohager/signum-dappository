<script>
    import Page from '../../../components/Page.svelte'
    import TextField from '@smui/textfield'
    import HelperText from '@smui/textfield/helper-text/index'
    import { hasLength } from '../../../utils/hasLength'
    import { isEmptyString } from '../../../utils/isEmptyString'

    const MaxNameLength = 32
    const MaxDescriptionLength = 384

    const characterCount = (text = '', max) => `${text.length}/${max}`

    let name = ''
    let description = ''

    $: isInvalidName = isEmptyString(name) || !hasLength(name, 1, MaxNameLength)
    $: nameFieldLabel = `Application Name (${characterCount(name, MaxNameLength)})`
    $: isInvalidDescription = isEmptyString(description) || !hasLength(name, 1, MaxDescriptionLength)
    $: descriptionFieldLabel = `Description (${characterCount(description, MaxDescriptionLength)})`

    $: isValid = !(isInvalidName || isInvalidDescription)

</script>

<style>
    .creation__header {
        text-align: center;
        margin-bottom: 1rem;
    }

    .creation__header img {
        height: 96px;
        width: 96px;
        text-align: center;
    }

    .creation__form {
        display: block;
        max-width: 600px;
        margin: 0 auto
    }

    .creation__form--input {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 1rem;
    }

    .creation__form--input-field {
        display: block;
        width: 100%;
    }
</style>

<Page>
    <div class="creation__header">
        <img src="/img/donation.svg" alt="register">
    </div>
    <div class="creation__form">
        <div class="creation__form--header">
            <h4 class="mdc-typography--headline4">
                Register New Application Token
            </h4>
        </div>
        <div class="creation__form--input">
            <div class="creation__form--input-field">
                <TextField bind:value={name}
                           fullwidth
                           invalid={isInvalidName}
                           label={nameFieldLabel}
                />
                {#if isInvalidName}
                    <HelperText validationMsg>{
                    isEmptyString(name)
                    ? 'Application Name is required'
                    : `Name must not be larger than ${MaxNameLength} characters`
                    }
                    </HelperText>
                {/if}
            </div>
        </div>
        <div class="creation__form--input">
            <div class="creation__form--input-field">
                <TextField bind:value={description}
                           fullwidth
                           invalid={isInvalidDescription}
                           label={descriptionFieldLabel}
                />
                {#if isInvalidDescription}
                    <HelperText validationMsg>{
                    isEmptyString(name)
                    ? 'Description is required'
                    : `Description must not be larger than ${MaxDescriptionLength} characters`
                    }
                    </HelperText>
                {/if}
            </div>
        </div>
    </div>
</Page>

