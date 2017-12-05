import QuickId from '@/components/QuickId.vue'
import { AeAppIcon } from '@aeternity/aepp-components'
import { AeIcon } from '@aeternity/aepp-components'

export default {
  name: 'app-browser',
  data () {
    return {
      iframe: '',
      showIframe : false,
      iframeLoading : true,
      isTouch: false,
      editModeActive: false,
      editModeTmOut: null
    }
  },
  computed : {
    apps() {
      return this.$store.state.apps
    },
    iframeStyle() {
      let style
      if(this.iframe === '') {
        style =  {
          'margin-left' : '200%',
          opacity : '0.0',
          transform: 'scale(1.5)'
        }
      } else {
        style =  {
          'margin-left' : '0%',
          opacity : '1.0',
          transform: 'scale(1.0)'
        }
      }
      style.display = this.showIframe ? 'block' : 'none'
      return style
    }
  },
  methods : {
    open(app) {
      if(app.type === 1) {
        if(this.iframe !== app.main) {
          this.iframeLoading = true
          this.iframe = app.main
        }
        this.showIframe = true
      } else {
        this.$router.push(app.main)
      }
    },
    back() {
      this.showIframe = false
    },
    add() {
      let url = prompt('URL');
      if(url) {
        this.$store.dispatch('addApp', url)
      }
    },
    remove(url) {
      if(url) {
        this.$store.dispatch('removeApp', url)
      }
    },
    isRemoveable(name) {
      const defaultApps = ['Notary', 'Transfer', 'Wall']
      return name ? defaultApps.indexOf(name) === -1 : true
    },
    editMode(action = null) {
      if (action === 'cancel') return clearTimeout(this.editModeTmOut)
      this.editModeTmOut = setTimeout(() => { this.editModeActive = true }, 1000)
    },
    clickOuter() {
      console.log('click')
      this.editModeActive = false
    },
    setIsTouch() {
      this.isTouch = ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch
    }
  },
  components: {
     QuickId,
     AeAppIcon,
     AeIcon
  },
  created () {
    this.setIsTouch()
  },
  mounted() {
    console.log(this.$refs)
    this.$refs.appframe.onload = () => {
      this.iframeLoading = false
    }
  }
}
