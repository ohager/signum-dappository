<script>
    import TextField from '@smui/textfield'
    import HelperText from '@smui/textfield/helper-text/index'
    import { hasLength } from '../../../utils/hasLength'
    import { isEmptyString } from '../../../utils/isEmptyString'
    import { MaxDataLength, MaxDescriptionLength, MaxNameLength, MaxUrlLength } from './constants'
    import { registration$, calculateDataLength } from './registrationStore'

    const characterCount = (text = '', max) => `${text.length}/${max}`

    $: isInvalidName = isEmptyString($registration$.name) || !hasLength($registration$.name, 1, MaxNameLength)
    $: isInvalidDescription = isEmptyString($registration$.desc) || !hasLength($registration$.desc, 1, MaxDescriptionLength)
    $: isInvalidRepo = !hasLength($registration$.repo, 0, MaxUrlLength)
    $: isInvalidImage = isEmptyString($registration$.img) || !hasLength($registration$.img, 0, MaxUrlLength)

    $: nameFieldLabel = `Application Name (${characterCount($registration$.name, MaxNameLength)})`
    $: descriptionFieldLabel = `Description (${characterCount($registration$.desc, MaxDescriptionLength)})`
    $: repoFieldLabel = `Repository URL (${characterCount($registration$.repo, MaxUrlLength)})`
    $: imageFieldLabel = `Image URL (${characterCount($registration$.img, MaxUrlLength)})`

    $: dataLength = calculateDataLength()
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
            <TextField bind:value={$registration$.name}
                       invalid={isInvalidName}
                       label={nameFieldLabel}
            />
            {#if isInvalidName}
                <HelperText validationMsg>{
                isEmptyString($registration$.name)
                ? 'Application Name is required'
                : `Name must not be larger than ${MaxNameLength} characters`
                }
                </HelperText>
            {/if}
        </div>
    </div>
    <div class="form--input">
        <div class="form--input-field">
            <TextField
                    textarea
                    bind:value={$registration$.desc}
                    invalid={isInvalidDescription}
                    label={descriptionFieldLabel}
            />
            {#if isInvalidDescription}
                <HelperText validationMsg>{
                isEmptyString($registration$.name)
                ? 'Description is required'
                : `Description must not be larger than ${MaxDescriptionLength} characters`
                }
                </HelperText>
            {/if}
        </div>
    </div>
    <div class="form--input">
        <div class="form--input-field">
            <TextField bind:value={$registration$.img}
                       invalid={isInvalidImage}
                       label={imageFieldLabel}
                       type="url"
            />
            {#if isInvalidImage}
                <HelperText validationMsg>{
                isEmptyString($registration$.img)
                ? 'Image URL is required'
                : `Image URL must not be larger than ${MaxUrlLength} characters`
                }
                </HelperText>
            {/if}
        </div>
    </div>
    <div class="form--input">
        <div class="form--input-field">
            <TextField bind:value={$registration$.repo}
                       invalid={isInvalidRepo}
                       label={repoFieldLabel}
                       type="url"
            />
            {#if isInvalidRepo}
                <HelperText validationMsg>{
                `Repository URL must not be larger than ${MaxUrlLength} characters`
                }
                </HelperText>
            {/if}
        </div>
    </div>

    <!-- TODO: License Field -->
</section>

