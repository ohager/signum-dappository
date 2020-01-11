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

</script>

<style>
    .form--input {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 1rem;
    }

    .form--input-field {
        display: block;
        width: 100%;
    }

    :global(.mdc-text-field) {
        width: 100% !important;
    }

</style>

<section>
    <div class="form--input">
        <div class="form--input-field">
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
    <div class="form--input">
        <div class="form--input-field">
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
    <div class="form--input">
        <div class="form--input-field">
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
    <div class="form--input">
        <div class="form--input-field">
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
</section>

