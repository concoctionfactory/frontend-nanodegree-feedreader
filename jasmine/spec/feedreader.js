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
			});
		});

		// loops through allfeeds and tests that the feed name is not empty
		it('name is not empty', function () {
			allFeeds.forEach(function (item) {
				expect(item.name).toBeDefined();
			});
		});
	});




	describe('The menu', function () {
		// tests that ensures the menu element is hidden
		it('is hidden', function () {
			expect($('body').hasClass('menu-hidden')).toBe(true);
		});

		// tests that the menu changes visibility when the menu icon is clicked.
		it("changes visibility", function () {
			var menuIcon = $('.menu-icon-link');
			menuIcon.click();
			expect($('body').hasClass('menu-hidden')).not.toBe(true);

			menuIcon.click();
			expect($('body').hasClass('menu-hidden')).toBe(true);
		});
	});



	//loadFeed() is asynchronous.
	describe('Inital Entries', function () {
		/* tests that the loadFeed function works and that
			there is a single .entry element within the .feed container.
		*/
		beforeEach(function (done) {
			loadFeed(0, function () {
				done();
			});
		});

		it("has entry element", function (done) {
			var container = $('.feed');
			expect(container.length).toBeGreaterThan(0);
			done();
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
				expect(feedOneEntry).not.toMatch(feedTwoEntry);
				done();
			});
		});

	});




	/*added test for future functionality
	the ability to favorite or save links
	tests that clicking the favorite button on entry will save link to favorite selection in feed-list
	*/
	describe("Favorite Selection", function(){
		var feedEntry;
		beforeEach(function (done) {
			loadFeed(0, function () {
				feedEntry = $('.feed .entry-link').first().attr('href');
				feedEntry.favorite();
				done();
			});

		});

		it("actually saves to favorite selection", function (done) {

			$(".feed-list .favorite-section").click();
			var favoriteEntry;
			loadFeed("favorite", function () {
				favoriteEntry = $('.feed .entry-link').first().attr('href');
				expect(feedEntry).toMatch(favoriteEntry);
				done();
			});
		});
	});

}());
