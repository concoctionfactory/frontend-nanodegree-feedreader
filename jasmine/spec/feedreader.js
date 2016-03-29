/* all tests are placed within the $() function,
 * to ensure they don't run until the DOM is ready.
 */
$(function () {

	describe('RSS Feeds', function () {
		// tests that the allFeeds variable has been defined and not empty
		it('are defined', function () {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});

		// loops through allfeeds and tests that the feed url is not empty
		it('url is not empty', function () {
			allFeeds.forEach(function (item) {
				expect(item.url).toBeDefined();
				expect(item.url.length).not.toBe(0);
			});
		});

		// loops through allfeeds and tests that the feed name is not empty
		it('name is not empty', function () {
			allFeeds.forEach(function (item) {
				expect(item.name).toBeDefined();
				expect(item.name.length).not.toBe(0);
			});
		});
	});




	describe('The menu', function () {
		// tests that ensures the menu element is hidden
		it('is hidden', function () {
			expect($('body').hasClass('menu-hidden')).toBeTruthy();
		});

		// tests that the menu changes visibility when the menu icon is clicked.
		it("changes visibility", function () {
			var menuIcon = $('.menu-icon-link');
			menuIcon.click();
			expect($('body').hasClass('menu-hidden')).toBeFalsy();

			menuIcon.click();
			expect($('body').hasClass('menu-hidden')).toBeTruthy();
		});
	});



	//loadFeed() is asynchronous.
	describe('Inital Entries', function () {
		/* tests that the loadFeed function works and that
			there is a single .entry element within the .feed container.
		*/
		beforeEach(function (done) {
			loadFeed(0, done);
		});

		it("has entry element", function () {
			var entry = $('.entry-link');
			expect(entry.length).toBeGreaterThan(0);
		});
	});


	// tests that when a new feed is loaded the content actually changes.
	describe('New Feed Selection', function () {
		var feedOneEntry;
		beforeEach(function (done) {
			loadFeed(0, function () {
				feedOneEntry = $('.feed .entry-link').first().attr('href');
				done();
			});

		});

		it("content actually changes", function (done) {
			var feedTwoEntry;
			loadFeed(1, function () {
				feedTwoEntry = $('.feed .entry-link').first().attr('href');
				expect(feedOneEntry).not.toBe(feedTwoEntry);
				done();
			});
		});

	});




	/*added test for future functionality
	the ability to favorite or save links
	tests that clicking the favorite button on entry will save link to favorite selection in feed-list
	*/
	describe("Favorite Selection", function(){
		var feedEntry, feedEntryUrl;
		beforeEach(function (done) {
			loadFeed(0, function () {
				feedEntry = $('.feed .entry-link').first();
				feedEntryUrl = feedEntry.attr('href');
				var favoriteBtn = feedEntry.find("favorite-btn"); // TODO: add favorite btn
				favoriteBtn.click(); //posts to favorited entry to server
				done();
			});

		});

		xit("actually saves to favorite selection", function (done) {

			$(".feed-list .favorite-section").click(); // will call loadFeed("favorite");
			var favoriteEntryUrl;

			// TODO: loadFeed function will check for "favorite" to be passed to it and upon being
			// passed "favorite" it will get the favorited entries from the server and display them
			loadFeed("favorite", function () {
				favoriteEntryUrl = $('.feed .entry-link').first().attr('href');
				expect(feedEntryUrl).toBe(favoriteEntryUrl);
				done();
			});
		});
	});

}());
