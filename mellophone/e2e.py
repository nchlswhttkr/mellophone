import os
from selenium import webdriver
from selenium.webdriver.firefox.options import Options


def main():
    print('\n'.join(os.listdir('/usr/local/bin')))
    firefox_options = Options()
    firefox_options.add_argument('--headless')
    browser = webdriver.Firefox(options=firefox_options)
    browser.implicitly_wait(2)

    browser.get('http://localhost:8000')
    link = browser.find_element_by_xpath(
        '//a[@aria-label="Sign in to Mellophone"]')
    link.click()
    assert browser.current_url == 'http://localhost:8000/sign-in'

    browser.quit()


if __name__ == "__main__":
    main()
