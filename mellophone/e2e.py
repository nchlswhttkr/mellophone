import time
import os
from selenium.webdriver import Firefox, FirefoxOptions
from lxml import html, etree


def main():
    options = FirefoxOptions()
    options.add_argument("-headless")
    browser = Firefox(options=options, service_log_path="e2e/geckodriver.log")
    browser.implicitly_wait(5)  # give pages time to render after loading

    try:
        browser.get("http://localhost:8000")
        browser.find_element_by_xpath(
            '//a[@aria-label="Sign in to Mellophone"]'
        ).click()

        # Create an account for a new user, seemingly new email
        browser.find_element_by_xpath('//label[text()="First name"]//input').send_keys(
            "Nicholas"
        )
        browser.find_element_by_xpath('//label[text()="Last name"]//input').send_keys(
            "Whittaker"
        )
        browser.find_element_by_xpath('//label[text()="Email"]//input').send_keys(
            "nicholas-{}@email.com".format(int(time.time()))
        )
        browser.find_element_by_xpath('//label[text()="Password"]//input').send_keys(
            "hunter2"
        )
        browser.find_element_by_xpath('//button[text()="Sign up"]').click()

        # Verify than an account was created
        browser.find_element_by_xpath('//*[text()="Account"]').click()
        browser.find_element_by_xpath('//*[text()="Nicholas Whittaker"]')

    except Exception as error:
        print("HTML DOCUMENT > e2e/index.html")
        raw = browser.find_element_by_id("root").get_attribute("outerHTML")
        doc = html.fromstring(raw)
        pretty = etree.tostring(doc, encoding="unicode", pretty_print=True)
        with open("e2e/index.html", "w") as outfile:
            outfile.write(pretty)

        print("SCREENSHOT > e2e/screenshot.png")
        browser.save_screenshot("e2e/screenshot.png")

        browser.quit()

        raise error

    browser.quit()


if __name__ == "__main__":
    main()
