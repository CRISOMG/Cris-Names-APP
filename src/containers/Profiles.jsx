/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-unresolved */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import actions from '@store/actions';

import { connect } from 'react-redux';
import ProfileCard from '@/components/ProfileCard';
import Spinner from '@/components/Spinner';

import WarnErrorMessage from '@/components/WarnErrorMessage';

import '@styles/containers/Profiles.css';

const Profiles = (props) => {
  const { request, fetchProfiles } = props;

  const controller = new AbortController();

  useEffect(() => {
    fetchProfiles({ ...controller.signal });
    return () => controller.abort();
  }, []);

  return (
    <section className='profile__list'>
      {request.error && !request.loading && <WarnErrorMessage handleTryFn={fetchProfiles} />}
      {request.loading && <Spinner />}
      {request.data && !request.loading
        && request.data.map((profile) => (
          <div key={profile._id} style={{ margin: '8px' }}>
            <Link to={`/edit/${profile._id}`}>
              <ProfileCard name={profile.name} lastname={profile.lastname} />
            </Link>
          </div>
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
  ...actions.request,
  ...actions.crud,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);
