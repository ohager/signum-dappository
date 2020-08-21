<script>
    import TextField from '@smui/textfield'
    import TextFieldIcon from '@smui/textfield/icon/index'
    import IconButton, { Icon } from '@smui/icon-button'
    import Select, { Option } from '@smui/select'
    import SelectHelperText from '@smui/select/helper-text/index'
    import HelperText from '@smui/textfield/helper-text/index'
    import Chip, { Set, Icon as ChipIcon, Checkmark, Text } from '@smui/chips'
    import Button, { Label } from '@smui/button'
    import { hasLength } from '../../utils/hasLength'
    import { isEmptyString } from '../../utils/isEmptyString'
    import { Licenses } from '../../utils/licenses'
    import {
        MaxDataLength,
        MaxDescriptionLength,
        MaxNameLength,
        MaxUrlLength,
        MaxTagLength,
        MaxTagCount,
    } from './constants'
    import { registration$, calculateDataLength } from './registrationStore'

    const licensesSpdx = Object.keys(Licenses)
    const characterCount = (text = '', max) => `${text.length}/${max}`

    let tag = ''

    $: isInvalidName = isEmptyString($registration$.name) || !hasLength($registration$.name, 1, MaxNameLength)
    $: isInvalidDescription = isEmptyString($registration$.desc) || !hasLength($registration$.desc, 1, MaxDescriptionLength)
    $: isInvalidRepo = !hasLength($registration$.repo, 0, MaxUrlLength)
    $: isInvalidImage = isEmptyString($registration$.img) || !hasLength($registration$.img, 0, MaxUrlLength)
    $: isInvalidTag = !hasLength(tag, 0, MaxTagLength) || hasTag(tag)
    $: hasMaximumTags = $registration$.tags.length >= MaxTagCount

    $: nameFieldLabel = `Application Name (${characterCount($registration$.name, MaxNameLength)})`
    $: descriptionFieldLabel = `Description (${characterCount($registration$.desc, MaxDescriptionLength)})`
    $: repoFieldLabel = `Repository or Project URL (${characterCount($registration$.repo, MaxUrlLength)})`
    $: imageFieldLabel = `Image URL (${characterCount($registration$.img, MaxUrlLength)})`
    $: tagFieldLabel = `Tag or Category (${characterCount(tag, MaxTagLength)})`

    $: licenseTextUrl = Licenses[$registration$.lic].url

    function hasTag(t) {
        return $registration$.tags.indexOf(t.toLowerCase()) >= 0
    }

    function addTag(t) {
        if (!hasTag(t) && !hasMaximumTags) {
            $registration$.tags = [...$registration$.tags, t.toLowerCase()]
            tag = ''
        }
    }

    function removeTag(t) {
        const newTags = [...$registration$.tags]
        const index = newTags.indexOf(t.toLowerCase())
        if (index >= 0) {
            newTags.splice(index, 1)
            $registration$.tags = newTags
        }
    }

    function handleTagKeypress(event) {
        if(event.key === 'Enter'){
            event.preventDefault()
            addTag(tag)
        }
    }

</script>

<section>
    <p class="mdc-typography--body1">
        Please, provide as much information as possible. Keep in mind, that the information cannot be edited once the registration is completed.
    </p>

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
                `URL must not be larger than ${MaxUrlLength} characters`
                }
                </HelperText>
            {/if}
        </div>
    </div>

    <div class="form--inline">
        <div class="form--input">
            <TextField bind:value={tag}
                       invalid={isInvalidTag}
                       label={tagFieldLabel}
                       disabled={hasMaximumTags}
                       withTrailingIcon={!hasMaximumTags}
                       on:keypress={handleTagKeypress}
            >
                {#if !hasMaximumTags}
                    <TextFieldIcon class="material-icons" role="button" on:click={() => addTag(tag)}>add_circle
                    </TextFieldIcon>
                {/if}
            </TextField>
            {#if isInvalidTag}
                <HelperText validationMsg>{
                hasTag(tag)
                ? 'Tag already added'
                : `Tag must not be larger than ${MaxTagLength} characters`
                }
                </HelperText>
            {/if}
            <Set chips={$registration$.tags} let:chip input>
                <Chip>
                    <Text>{chip.toUpperCase()}</Text>
                    <Icon class="material-icons" trailing role="button" on:click={() => removeTag(chip)}>cancel</Icon>
                </Chip>
            </Set>
        </div>
        <div class="form--license-select">
            <div class="form--input fullwidth">
                <div class="form--input-field">
                    <Select enhanced bind:value={$registration$.lic} label="License">
                        {#each licensesSpdx as license}
                            <Option value={license} selected={$registration$.lic === license}>{license}</Option>
                        {/each}
                    </Select>
                    <SelectHelperText>
                        {#if isEmptyString(licenseTextUrl)}
                            No License Text
                        {:else}
                            <a href={licenseTextUrl} target="_blank">License Text</a>
                        {/if}
                    </SelectHelperText>
                </div>
            </div>
            <a href="https://choosealicense.com/appendix/" target="_blank"
               title="Click to get help for license choice">
                <Icon class="material-icons">help_outline</Icon>
            </a>
        </div>
    </div>
</section>

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

    .form--license-select{
        display: flex;
        flex-direction: row;
        align-items: baseline;
    }

    .form--license-select a,
    .form--license-select a:visited {
        color: gray;
        margin-left: 0.5rem;
    }

    .form--inline {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    :global(.mdc-text-field) {
        width: 100% !important;
    }

    :global(.mdc-select) {
        width: 100% !important;
    }

    :global(.mdc-select+.mdc-select-helper-text),
    :global(.mdc-text-field+.mdc-text-field-helper-line) {
        margin-left: 0 !important;
        padding-left: 0 !important;
    }

    @media (max-width: 480px) {
        .form--inline {
            flex-direction: column;
            width: 100%;
        }
    }

</style>

