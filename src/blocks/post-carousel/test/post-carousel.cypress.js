/*
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Post Carousel Block', function() {
	/**
	 * Test that we can add a post-carousel block to the content, not alter
	 * any settings, and are able to successfully save the block without errors.
	 */
	it( 'Test post-carousel block saves with empty values.', function() {
		helpers.addBlockToPost( 'coblocks/post-carousel', true );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/post-carousel' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-post-carousel' ).should( 'exist' );

		helpers.editPage();
	} );

	/**
	 * Test the post-carousel block column and post count controls
	 */
	it( 'Test the post-carousel block column and post count controls.', function() {
		helpers.addBlockToPost( 'coblocks/post-carousel', true );

		helpers.selectBlock( 'post-carousel' );

		cy.get( '.wp-block-coblocks-post-carousel__item' );

		[ 1, 2, 3, 4 ].forEach( ( columns ) => {
			helpers.setInputValue( 'post carousel settings', 'columns', columns );
			cy.get( '[data-type="coblocks/post-carousel"]' ).find( '.slick-slide[aria-hidden="false"]' ).should( 'have.length', columns );
		} );

		helpers.checkForBlockErrors( 'coblocks/post-carousel' );

		[ 1, 2, 3, 4 ].forEach( ( numberOfPosts ) => {
			helpers.setInputValue( 'feed settings', 'number of posts', numberOfPosts );
			cy.get( '[data-type="coblocks/post-carousel"]' ).find( '.slick-slide:not(.slick-cloned)' ).should( 'have.length', numberOfPosts );
		} );

		helpers.checkForBlockErrors( 'coblocks/post-carousel' );
	} );

	/**
	 * Test the post-carousel block saves with custom classes
	 */
	it( 'Test the post-carousel block custom classes.', function() {
		helpers.addBlockToPost( 'coblocks/post-carousel', true );

		cy.get( '.edit-post-sidebar' ).contains( /post carousel settings/i ).click( { force: true } );

		cy.get( '.edit-post-sidebar' ).contains( /feed settings/i ).click( { force: true } );

		helpers.addCustomBlockClass( 'my-custom-class', 'post-carousel' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/post-carousel' );

		cy.get( '.my-custom-class > .coblocks-slick' ).should( 'exist' );

		helpers.viewPage();

		cy.get( '.my-custom-class > .coblocks-slick' ).should( 'exist' );

		helpers.editPage();
	} );
} );
