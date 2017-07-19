// Copyright 2016 Documize Inc. <legal@documize.com>. All rights reserved.
//
// This software (Documize Community Edition) is licensed under
// GNU AGPL v3 http://www.gnu.org/licenses/agpl-3.0.en.html
//
// You can operate outside the AGPL restrictions by purchasing
// Documize Enterprise Edition and obtaining a commercial license
// by contacting <sales@documize.com>.
//
// https://documize.com

import Ember from 'ember';
import AuthProvider from '../../mixins/auth';

const {
	isEmpty,
	computed,
	set,
	get
} = Ember;

export default Ember.Component.extend(AuthProvider, {
	newUser: { firstname: "", lastname: "", email: "", active: true },
	firstnameEmpty: computed.empty('newUser.firstname'),
	lastnameEmpty: computed.empty('newUser.lastname'),
	emailEmpty: computed.empty('newUser.email'),
	hasFirstnameEmptyError: computed.and('firstnameEmpty', 'firstnameError'),
	hasLastnameEmptyError: computed.and('lastnameEmpty', 'lastnameError'),
	hasEmailEmptyError: computed.and('emailEmpty', 'emailError'),

	actions: {
		add() {
			if (isEmpty(this.get('newUser.firstname'))) {
				set(this, 'firstnameError', true);
				return $("#newUserFirstname").focus();
			}
			if (isEmpty(this.get('newUser.lastname'))) {
				set(this, 'lastnameError', true);
				return $("#newUserLastname").focus();
			}
			if (isEmpty(this.get('newUser.email')) || is.not.email(this.get('newUser.email'))) {
				set(this, 'emailError', true);
				return $("#newUserEmail").focus();
			}

			let user = get(this, 'newUser');

			get(this, 'add')(user).then(() => {
				this.set('newUser', { firstname: "", lastname: "", email: "", active: true });
				set(this, 'firstnameError', false);
				set(this, 'lastnameError', false);
				set(this, 'emailError', false);
				$("#newUserFirstname").focus();
			});
		}
	}
});
