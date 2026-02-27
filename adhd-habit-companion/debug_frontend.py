from playwright.sync_api import sync_playwright

def inspect_page_source():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            page.goto("http://localhost:8081")
            page.wait_for_load_state("networkidle")
            # Wait a bit extra for JS to render
            page.wait_for_timeout(5000)

            content = page.content()
            print(content)

            page.screenshot(path="debug_screenshot.png")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    inspect_page_source()
