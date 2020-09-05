<script>
    import { goto } from '@sapper/app'
    import Button, { Label } from '@smui/button'
    import {
        Page,
        TokenItem,
        TokenItemVariant,
        burstFeeStore,
        PassphraseInput,
        PaymentQrCode,
        appStore,
    } from '../_common'
    import Logo from '../_common/Logo.svelte'
    import { ThemeNames } from '../../utils/themeNames'
    import List, { Item, Graphic, Text } from '@smui/list'
    import Link from '../Link.svelte'

    const { theme$ } = appStore

    const openUrl = url => () => {
        window.open(url, '_blank')
    }

    $: dark = $theme$ === ThemeNames.Default

</script>

<Page>
    <div class="header">
        <Logo height="128px" {dark} />
    </div>
    <section class="general">
        <p>
            This dApp is built with ❤️ by ohager
        </p>
        <p class="github">
            <img alt="GitHub stars" src="https://img.shields.io/github/stars/ohager/burst-applications?style=social">
            <Link href="https://github.com/ohager/burst-applications">This project is Open Source</Link>
        </p>
    </section>
    <section class="credits">
        <div class="credits-container">
            <div class="mdc-typography--headline6">Credits</div>
            <List class="credit-list" dense>
                <Item on:SMUI:action={openUrl('https://www.burst-coin.org/')}>
                    <Graphic>
                        <img src="/img/burst-logo.svg" height="32px" alt="burstcoin logo">
                    </Graphic>
                    <Text>Burstcoin Community</Text>
                </Item>
                <Item on:SMUI:action={openUrl('https://svelte.dev/')}>
                    <Graphic>
                        <img src="/img/svelte-logo.svg" height="32px" alt="svelte logo">
                    </Graphic>
                    <Text>Svelte</Text>
                </Item>
                <Item on:SMUI:action={openUrl('https://sveltematerialui.com/')}>
                    <Graphic>
                        <img src="/img/smui-logo.png" height="32px" alt="svelte material ui logo">
                    </Graphic>
                    <Text>Svelte Material UI</Text>
                </Item>
            </List>
            <div class="mdc-typography--body1">
                Third Party Artworks and Icons
            </div>
            <List class="credit-list" dense>
                <Item on:SMUI:action={openUrl('https://flaticon.com/')}>
                    <Graphic>
                        <img src="/img/flaticon-logo.svg" height="32px" alt="flaticon logo">
                    </Graphic>
                    <Text>Flaticon Authors: Pixel Perfect, Free Pic, Pro Symbols</Text>
                </Item>
            </List>
            <div class="mdc-typography--headline6">Special Credits</div>
            <ul class="special-credits">
                <li><small>Nivok for this dApps name</small></li>
                <li><small>jjos for BlockTalk Smart Contract Compiler</small></li>
                <li><small>Shoutouts to the BAT and BMF</small></li>
            </ul>
        </div>

    </section>
    <section class="disclaimer">
        <b>Disclaimer</b>
        <small>
            <p>This program is free software: you can redistribute it and/or modify
                it under the terms of the GNU General Public License as published by
                the Free Software Foundation, either version 3 of the License, or
                (at your option) any later version.</p>

            <p>This program is distributed in the hope that it will be useful,
                but WITHOUT ANY WARRANTY; without even the implied warranty of
                MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
                GNU General Public License for more details.</p>

            <p>You should have received a copy of the GNU General Public License
                along with this program.  If not, see <a href="http://www.gnu.org/licenses/" target="_blank">http://www.gnu.org/licenses/</a></p>

        </small>
    </section>
</Page>


<style>

    :root {
        font-family: Roboto,sans-serif;
    }

    ul.special-credits {
        list-style: none;
        padding: 0;
    }

    .header {
        text-align: center;
        margin-bottom: 1rem;
    }

    .header img {
        height: 96px;
        width: 96px;
        text-align: center;
    }

    .general {
        margin: 0 auto;
        width: 50%;
        text-align: center;
    }
    .general .github {
        display: flex;
        justify-content: center;
    }

    .general .github img {
        margin-right: 1rem;
    }

    .credits-container {
        width: 50%;
        margin: 0 auto;
        text-align: center;
    }


    @media (max-width: 480px){
        .credits-container {
            width: 80%;
        }
    }
</style>
