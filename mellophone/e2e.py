from selenium.webdriver import Firefox, FirefoxOptions


def main():
    options = FirefoxOptions()
    options.add_argument('-headless')
    browser = Firefox(options=options)
    browser.implicitly_wait(5)  # give pages time to render after loading

    browser.get('http://localhost:8000')
    link = browser.find_element_by_xpath(
        '//a[@aria-label="Sign in to Mellophone"]')
    link.click()
    assert browser.current_url == 'http://localhost:8000/sign-in'

    browser.quit()


if __name__ == "__main__":
    main()
