class Detection {
  isPhone ()
  {
    if (!this.isPhoneChecked) {
      this.isPhoneChecked = true

      this.isPhoneCheck = document.documentElement.classList.contains('phone')
    }

    return this.isPhoneCheck
  }

  isTablet()
  {
    if (!this.isTabletChecked) {
      this.isTabletChecked = true

      this.isTabletCheck = document.documentElement.classList.contains('tablet')
    }

    return this.isTabletCheck
  }
  isDesktop()
  {
    if (!this.isDesktopChecked) {
      this.isDesktopChecked = true

      this.isDesktopCheck = document.documentElement.classList.contains('desktop')
    }

    return this.isDesktopCheck
  }
}

export default new Detection();
