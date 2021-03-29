import { createSelector } from 'reselect';

const selectorDirectory = state => state.directory;

export const selectDirectorySections = createSelector(
    [selectorDirectory],
    directory => directory.sections
);