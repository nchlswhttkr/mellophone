import time
import os
from selenium.webdriver import Firefox, FirefoxOptions
from lxml import html, etree


def main():
    os.makedirs("e2e", exist_ok=True)

    options = FirefoxOptions()
    options.add_argument("-headless")
    browser = Firefox(options=options, service_log_path="e2e/geckodriver.log")
    browser.implicitly_wait(5)  # allows for pages to update with renders

    try:
        browser.get("http://localhost:8000")
        browser.find_element_by_xpath(
            '//a[@aria-label="Sign in to Mellophone"]'
        ).click()

        # Create an account for a new user
        email = "nicholas-{}@example.com".format(int(time.time()))  # a "new" email
        browser.find_element_by_xpath('//label[text()="First name"]//input').send_keys(
            "Nicholas"
        )
        browser.find_element_by_xpath('//label[text()="Last name"]//input').send_keys(
            "Whittaker"
        )
        browser.find_element_by_xpath('//label[text()="Email"]//input').send_keys(email)
        browser.find_element_by_xpath('//label[text()="Password"]//input').send_keys(
            "hunter2"
        )
        browser.find_element_by_xpath('//button[text()="Sign up"]').click()

        # Verify than an account was created
        browser.find_element_by_xpath('//*[text()="Account"]').click()
        browser.find_element_by_xpath('//*[text()="Nicholas Whittaker"]')

        # Sign out and go to sign back in with our existing user
        browser.find_element_by_xpath('//button[text()="Sign out"]').click()
        browser.find_element_by_xpath(
            '//a[@aria-label="Sign in to Mellophone"]'
        ).click()
        browser.find_element_by_xpath('//label[text()="Email"]//input').send_keys(email)
        browser.find_element_by_xpath('//label[text()="Password"]//input').send_keys(
            "hunter2"
        )
        browser.find_element_by_xpath('//button[text()="Sign in"]').click()

        # Verify that we're signed back in
        browser.find_element_by_xpath('//*[text()="Account"]').click()
        browser.find_element_by_xpath('//*[text()="Nicholas Whittaker"]')

    except Exception as error:
        # Screenshot the page to help find visual errors
        browser.save_screenshot("e2e/screenshot.png")

        # Get the DOM and output it, useful if the error is related to a
        # missing element or attribute.
        raw = browser.find_element_by_id("root").get_attribute("outerHTML")
        doc = html.fromstring(raw)
        pretty = etree.tostring(doc, encoding="unicode", pretty_print=True)
        with open("e2e/index.html", "w") as outfile:
            outfile.write(pretty)

        # Although we have the above debugging, the test should still fail.
        browser.quit()
        raise error

    browser.quit()


if __name__ == "__main__":
    main()
