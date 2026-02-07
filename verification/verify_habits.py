from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context(viewport={'width': 375, 'height': 812})
    page = context.new_page()

    print("Navigating to app...")
    page.goto("http://localhost:8081")

    # Wait for content to load
    page.wait_for_timeout(5000)

    # Check for Onboarding first slide title
    if page.get_by_text("Finally. A Habit Tracker").is_visible():
        print("Onboarding found")
        page.get_by_text("Continue").click()
        page.wait_for_timeout(500)
        page.get_by_text("Continue").click()
        page.wait_for_timeout(500)
        page.get_by_text("Continue").click()
        page.wait_for_timeout(500)
        page.get_by_text("Get Started").click()
        page.wait_for_timeout(1000)
    else:
        print("Onboarding skipped or not found. Checking for Home...")
        try:
            expect(page.get_by_text("Good Morning!")).to_be_visible(timeout=5000)
            print("Home found.")
        except:
             print("Neither Onboarding nor Home found. Taking screenshot.")
             page.screenshot(path="verification/failed_state.png")
             return

    # Navigate to Habits tab
    print("Clicking Habits tab...")
    # Try finding by text "Habits" (Tab label)
    try:
        page.get_by_text("Habits", exact=True).click()
    except:
        print("Could not find 'Habits' tab text.")
        page.screenshot(path="verification/failed_find_habits_tab.png")
        return

    try:
        expect(page.get_by_text("Your Habits")).to_be_visible()
    except:
        print("Your Habits header not visible. Maybe navigation failed.")
        page.screenshot(path="verification/failed_navigation.png")
        return

    # Add Habit
    print("Adding habit...")
    # Use accessibility label "Add New Habit"
    try:
        page.get_by_label("Add New Habit").click()
    except:
        print("Could not find Add New Habit button.")
        page.screenshot(path="verification/failed_find_add_button.png")
        return

    # Verify Add Habit Screen
    expect(page.get_by_text("New Habit")).to_be_visible()

    # Fill Input
    print("Filling habit details...")
    page.get_by_label("Habit Name Input").fill("Test Habit")

    # Save
    page.get_by_label("Save Habit").click()

    # Verify added
    print("Verifying habit added...")
    expect(page.get_by_text("Test Habit")).to_be_visible()

    # Perform Long Press to Edit
    print("Performing long press...")
    try:
        element = page.get_by_label("Edit Test Habit")
        box = element.bounding_box()
        if box:
            page.mouse.move(box["x"] + box["width"] / 2, box["y"] + box["height"] / 2)
            page.mouse.down()
            page.wait_for_timeout(1000)
            page.mouse.up()
        else:
            print("Could not find element bounding box")
    except Exception as e:
        print(f"Error finding/interacting with habit item: {e}")


    # Verify Edit Screen
    # Should see "Edit Habit"
    print("Verifying edit screen...")
    try:
        expect(page.get_by_text("Edit Habit")).to_be_visible(timeout=3000)

        # Update Name
        print("Updating habit...")
        page.get_by_label("Habit Name Input").fill("Updated Habit")

        # Update
        page.get_by_label("Save Habit").click()

        # Verify updated
        print("Verifying habit updated...")
        expect(page.get_by_text("Updated Habit")).to_be_visible()
    except Exception as e:
        print(f"Edit flow failed: {e}")
        page.screenshot(path="verification/failed_edit.png")

    # Screenshot
    print("Taking final screenshot...")
    page.screenshot(path="verification/verification.png")

    browser.close()
    print("Done.")

if __name__ == "__main__":
    with sync_playwright() as p:
        run(p)
