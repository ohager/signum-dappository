<script>
    import {fade} from 'svelte/transition'
    import TextField from '@smui/textfield'
    import TextFieldIcon from '@smui/textfield/icon/index'
    import IconButton, { Icon } from '@smui/icon-button'
    import Select, { Option } from '@smui/select'
    import SelectHelperText from '@smui/select/helper-text/index'
    import HelperText from '@smui/textfield/helper-text/index'
    import Chip, { Set, Text } from '@smui/chips'
    import { hasLength } from '../../utils/hasLength'
    import { isEmptyString } from '../../utils/isEmptyString'
    import { Licenses } from '../../utils/licenses'
    import { MaxDescriptionLength, MaxNameLength, MaxTagCount, MaxTagLength, MaxUrlLength } from './constants'
    import { registration$ } from './registrationStore'
    import { Events } from '../../utils/events'
    import { dispatchEvent } from '../../utils/dispatchEvent'
    import { sanitizeUrl } from '@braintree/sanitize-url'
    import { apiService } from '../../services/apiService'
    import { isValidUrl } from '../../utils/validators'

    const licensesSpdx = Object.keys(Licenses)
    const characterCount = (text = '', max) => `${text.length}/${max}`

    let tag = ''
    let selectedImageFile = null
    let fileInputEl = null
    let uploadProgress = 0.0
    let isUploading = false
    let imageFieldLabel = ''

    $: isInvalidName = isEmptyString($registration$.name) || !hasLength($registration$.name, 1, MaxNameLength)
    $: isInvalidDescription = isEmptyString($registration$.desc) || !hasLength($registration$.desc, 1, MaxDescriptionLength)
    $: isInvalidRepo = !isValidUrl($registration$.repo)
    $: isInvalidImage = !isValidUrl($registration$.img)
    $: isInvalidTag = !hasLength(tag, 0, MaxTagLength) || hasTag(tag)
    $: hasMaximumTags = $registration$.tags.length >= MaxTagCount

    $: nameFieldLabel = `Application Name (${characterCount($registration$.name, MaxNameLength)})`
    $: descriptionFieldLabel = `Description (${characterCount($registration$.desc, MaxDescriptionLength)})`
    $: repoFieldLabel = `Repository or Project URL (${characterCount($registration$.repo, MaxUrlLength)})`
    $: tagFieldLabel = `Tag or Category (${characterCount(tag, MaxTagLength)})`
    $: licenseTextUrl = Licenses[$registration$.lic].url
    $: {
        const baseLabel = 'Image (Max 256KiB, approx. 720x400 px)'
        imageFieldLabel = `${baseLabel} [No image selected yet]`
        if (selectedImageFile) {
            imageFieldLabel = `${baseLabel} [${selectedImageFile.name}]`
        }
        if ($registration$.img) {
            imageFieldLabel = baseLabel
        }
    }

    function hasTag(t) {
        return $registration$.tags.indexOf(t.toLowerCase()) >= 0
    }

    function addTag(t) {
        const trimmed = t.trim();
        if (trimmed.length && !hasTag(trimmed) && !hasMaximumTags) {
            $registration$.tags = [...$registration$.tags, trimmed.toLowerCase()]
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

    async function handleFileUpload(e) {
        try {
            isUploading = true
            $registration$.img = await apiService.uploadSingleFile({
                fileObj: selectedImageFile,
                keyValues: { account: $registration$.account },
                mangleFilename: true,
                onProgressFn: (e) => {
                    const { loaded, total } = e
                    uploadProgress = loaded / total
                }
            })
            dispatchEvent(Events.Success, 'Image File uploaded successfully')
            selectedImageFile = null
        } catch (e) {
            dispatchEvent(Events.Error, e.message)
        } finally {
            isUploading = false
        }
    }

    function openFileDialog(){
        selectedImageFile = null
        fileInputEl.click()
    }

    function handleSelectedFiles(e) {
        selectedImageFile = e.target.files[0]
    }

    function handleRepoUrlChanged(e) {
        $registration$.repo = sanitizeUrl(e.target.value)
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
    <div class="form--inline">
        <div class="form--input fullwidth">
            <div class="form--input-field">
                <TextField
                    bind:value={$registration$.img}
                    type="text"
                    invalid={isInvalidImage}
                    label={imageFieldLabel}
                    placeholder="Browse for image"
                    disabled
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
        <input bind:this={fileInputEl} hidden type="file" on:change={handleSelectedFiles} accept=".png,.jpg,.webp,.svg">
        <IconButton title="Browse for image" class="material-icons" on:click={openFileDialog}>image_search</IconButton>
        <div class="upload-icon-wrapper">
            {#if isUploading}
                <div class="upload-icon mdc-typography--body1 animation-pulse" style="top:12px;left:8px"
                     transition:fade>{(uploadProgress * 100).toFixed(1)}%
                </div>
            {:else}
                <div class="upload-icon" transition:fade>
                    <IconButton class="material-icons"
                                on:click={handleFileUpload}
                                disabled={!selectedImageFile}
                                title="Upload selected image"
                    >
                        cloud_upload
                    </IconButton>
                </div>
            {/if}
        </div>
    </div>
    <div class="form--input">
        <div class="form--input-field">
            <TextField bind:value={$registration$.repo}
                       invalid={isInvalidRepo}
                       label={repoFieldLabel}
                       type="url"
                       on:change={handleRepoUrlChanged}
            />
            {#if isInvalidRepo}
                <HelperText validationMsg>Unsupported or invalid URL</HelperText>
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
                {#if !hasMaximumTags && tag.trim().length > 0}
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
        align-items: center;
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

    .upload-icon-wrapper {
        position: relative;
        height: 48px;
        width: 48px;
    }

    .upload-icon-wrapper .upload-icon {
        position: absolute;
    }


</style>

