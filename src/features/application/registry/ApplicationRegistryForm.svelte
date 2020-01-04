<script>
    import Button, { Label } from '@smui/button'
    import TextField from '@smui/textfield'
    import HelperText from '@smui/textfield/helper-text/index'
    import { hasLength } from '../../../utils/hasLength'
    import { isEmptyString } from '../../../utils/isEmptyString'
    import { goto } from '@sapper/app'
    import { MaxDataLength, MaxDescriptionLength, MaxNameLength, MaxUrlLength } from './constants'
    import { RouteHome } from '../../../utils/routes'

    const characterCount = (text = '', max) => `${text.length}/${max}`

    let name = ''
    let desc = ''
    let repo = ''
    let img = ''
    let lic = 'MIT'
    let tags = []

    $: isInvalidName = isEmptyString(name) || !hasLength(name, 1, MaxNameLength)
    $: nameFieldLabel = `Application Name (${characterCount(name, MaxNameLength)})`
    $: isInvalidDescription = isEmptyString(desc) || !hasLength(name, 1, MaxDescriptionLength)
    $: descriptionFieldLabel = `Description (${characterCount(desc, MaxDescriptionLength)})`
    $: isInvalidRepo = !hasLength(repo, 0, MaxUrlLength)
    $: repoFieldLabel = `Repository URL (${characterCount(repo, MaxUrlLength)})`
    $: isInvalidImage = !hasLength(img, 0, MaxUrlLength)
    $: imageFieldLabel = `Image URL (${characterCount(img, MaxUrlLength)})`

    $: data = { name, desc, repo, img, tags }
    $: dataLength = JSON.stringify(data).length
    $: isInvalid = isInvalidName
            || isInvalidDescription
            || isInvalidRepo
            || isInvalidImage
            || dataLength > MaxDataLength

    // TODO: ask for Passphrase first and verify account (existence and balance)

    function handleCancel() {
        goto(RouteHome())
    }

    function handleRegister() {
        console.log('registering')
    }

</script>

<style>
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

    .creation__form--footer {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 2rem;
    }

    .creation__form--input-field {
        display: block;
        width: 100%;
    }

    :global(.mdc-text-field) {
        width: 100% !important;
    }

</style>

<div class="creation__form">
    <div class="creation__form--header">
        <h4 class="mdc-typography--headline4">
            Register New Application Token
        </h4>
    </div>
    <div class="creation__form--input">
        <div class="creation__form--input-field">
            <TextField bind:value={name}
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
            <TextField bind:value={desc}
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
    <div class="creation__form--input">
        <div class="creation__form--input-field">
            <TextField bind:value={repo}
                       invalid={isInvalidRepo}
                       label={repoFieldLabel}
                       type="URL"
            />
            {#if isInvalidRepo}
                <HelperText validationMsg>{
                `Repository URL must not be larger than ${MaxUrlLength} characters`
                }
                </HelperText>
            {/if}
        </div>
    </div>
    <div class="creation__form--input">
        <div class="creation__form--input-field">
            <TextField bind:value={img}
                       invalid={isInvalidImage}
                       label={imageFieldLabel}
                       type="URL"
            />
            {#if isInvalidImage}
                <HelperText validationMsg>{
                `Image URL must not be larger than ${MaxUrlLength} characters`
                }
                </HelperText>
            {/if}
        </div>
    </div>

    <!-- TODO: License Field -->

    <div class="creation__form--footer">
        <Button on:click={handleCancel}>
            <Label>Cancel</Label>
        </Button>
        <Button on:click={handleRegister} disabled={isInvalid}>
            <Label>Register</Label>
        </Button>
    </div>
</div>

