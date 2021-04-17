import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import ProfileCard from '../components/ProfileCard';
import Spinner from '../components/Spinner';

import WarnErrorMessage from '../components/WarnErrorMessage';

import '../assets/styles/components/profile.css';
import actions from '../store/actions';

const Profiles = (props) => {
  const { request, fetchProfiles } = props;

  const controller = new AbortController();
  const { signal } = controller;

  useEffect(() => {
    fetchProfiles({ signal });
    return () => controller.abort();
  }, []);

  return (
    <section className='profile__list'>
      {request.error && !request.loading && <WarnErrorMessage tryFn={fetchProfiles} />}
      {request.loading && <Spinner />}
      {request.data &&
        request.data.map((profile) => (
          // eslint-disable-next-line no-underscore-dangle
          <Link key={profile.name} to={`/edit/${profile._id}`}>
            <ProfileCard name={profile.name} lastname={profile.lastname} />
          </Link>
        ))}
    </section>
  );
};

Profiles.propTypes = {
  request: PropTypes.objectOf(PropTypes.any).isRequired,
  fetchProfiles: PropTypes.func.isRequired,
};

const mapStateToProps = ({ request }) => ({
  request,
});

const mapDispatchToProps = {
  ...actions.requestActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);
