<script>
  import {
    Page,
    appStore,
  } from '../_common'
  import Logo from '../_common/Logo.svelte'
  import {ThemeNames} from '../../utils/themeNames'
  import List, {Item, Graphic, Text} from '@smui/list'
  import Link from '../_common/Link.svelte'

  const {theme$} = appStore

  const openUrl = url => () => {
    window.open(url, '_blank')
  }

  $: dark = $theme$ === ThemeNames.Dark

</script>

<Page>
    <div class="header">
        <Logo height="128px" {dark}/>
    </div>
    <section class="general">
        <p>
            This dApp is built with ❤️ by ohager
        </p>
        <p class="github">
            <img alt="GitHub stars" src="https://img.shields.io/github/stars/ohager/signum-dappository?style=social">
            <Link href="https://github.com/ohager/signum-dappository">This project is Open Source</Link>
        </p>
    </section>
    <section class="credits">
        <div class="credits-container">
            <div class="mdc-typography--headline6">Credits</div>
            <List class="credit-list" dense>
                <Item>
                    <a class="link" href="https://signum.network/" rel="noopener noreferrer" target="_blank">
                        <Graphic>
                            <img src="/img/signum-logo.svg" height="32px" alt="signum logo">
                        </Graphic>
                        <Text>Signum Community</Text>
                    </a>
                </Item>
                <Item>
                    <a class="link" href="https://svelte.dev/" rel="noopener noreferrer" target="_blank">
                        <Graphic>
                            <img src="/img/svelte-logo.svg" height="32px" alt="svelte logo">
                        </Graphic>
                        <Text>Svelte</Text>
                    </a>
                </Item>
                <Item>
                    <a class="link" href="https://sveltematerialui.com/" rel="noopener noreferrer" target="_blank">
                        <Graphic>
                            <img src="/img/smui-logo.png" height="32px" alt="svelte material ui logo">
                        </Graphic>
                        <Text>Svelte Material UI</Text>
                    </a>
                </Item>
                <Item>
                    <a class="link" href="https://web3.storage/" rel="noopener noreferrer" target="_blank">
                        <Graphic>
                            <img class:light={dark} src="/img/web3-storage-logo.svg" height="32px"
                                 alt="web3 storage logo">
                        </Graphic>
                        <Text>Web3 IPFS Storage Service</Text>
                    </a>
                </Item>
            </List>
            <div class="mdc-typography--body1">
                Third Party Artworks and Icons
            </div>
            <List class="credit-list" dense>
                <Item>
                    <a class="link" href="https://flaticon.com/" rel="noopener noreferrer" target="_blank">
                        <Graphic>
                            <img src="/img/flaticon-logo.svg" height="32px" alt="flaticon logo">
                        </Graphic>
                        <Text>Flaticon Authors: Pixel Perfect, Free Pic, Pro Symbols</Text>
                    </a>
                </Item>
            </List>
            <div class="mdc-typography--headline6">Special Credits</div>
            <ul class="special-credits">
                <li><small>Nivok for this dApps name</small></li>
                <li><small>jjos for SmartJ Smart Contract Compiler</small></li>
                <li><small>Shoutouts to the Signum Community</small></li>
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
                MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
                GNU General Public License for more details.</p>

            <p>You should have received a copy of the GNU General Public License
                along with this program. If not, see <a href="http://www.gnu.org/licenses/" target="_blank">http://www.gnu.org/licenses/</a>
            </p>

        </small>
    </section>
</Page>


<style>

    :root {
        font-family: Roboto, sans-serif;
    }

    ul.special-credits {
        list-style: none;
        padding: 0;
    }

    .header {
        text-align: center;
        margin-bottom: 1rem;
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

    .light {
        filter: invert(1);
    }

    .link {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    @media (max-width: 480px) {
        .credits-container {
            width: 80%;
        }

        .general {
            width: 100%;
        }
    }
</style>
