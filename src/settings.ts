interface SettingTy {
  title: string
  logo: string
  fixedHeader: boolean
  sidebarLogo: boolean
  showTitle: boolean
  showLeftMenu: boolean
  ShowDropDown: boolean
  showHamburger: boolean
  isNeedLogin: boolean
  isNeedNprogress: boolean
  needTagsView?: boolean
  tagsViewNum?: number
  openProdMock: boolean
  errorLog: string | Array<string>
  viteBasePath: string
}

const setting: SettingTy = {
  title: 'Vue3 Admin Ts',
  logo: 'http://8.135.1.141/file/images/logo.svg',
  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: true,
  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: true,
  /**
   * @type {boolean} true | false
   * @description Whether show the title in Navbar
   */
  showTitle: false,
  /**
   * @type {boolean} true | false
   * @description Whether show the settings right-panel
   */
  showLeftMenu: true,
  /**
   * @type {boolean} true | false
   * @description Whether show the drop-down
   */
  ShowDropDown: true,
  showHamburger: true,
  /**
   * @type {boolean} true | false
   * @description Whether need login
   */
  isNeedLogin: true,

  /**
   * @type {boolean} true | false
   * @description Whether need nprogress
   */
  isNeedNprogress: true,

  /**
   * @type {boolean} true | false
   * @description Whether show TagsView
   */
  // needTagsView: true,
  // /**
  //  * @description TagsView show number
  //  */
  // tagsViewNum: 6,
  //showSettings: true
  /**
   * @type {boolean} true | false
   * @description Whether  open prod mock
   * in react openProdMock can't use
   */
  openProdMock: false,
  /**
   * @type {string | array} 'serve' | ['build', 'serve']
   * @description Need show err logs component.
   * The default is only used in the production env
   * If you want to also use it in dev, you can pass ['build', 'serve']
   */
  errorLog: ['build'],
  /*
   * vite.config.js base config
   * such as
   * */
  viteBasePath: '/react-admin-ts/'
}

export default setting
