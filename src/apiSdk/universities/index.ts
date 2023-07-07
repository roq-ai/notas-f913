import axios from 'axios';
import queryString from 'query-string';
import { UniversityInterface, UniversityGetQueryInterface } from 'interfaces/university';
import { GetQueryInterface } from '../../interfaces';

export const getUniversities = async (query?: UniversityGetQueryInterface) => {
  const response = await axios.get(`/api/universities${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createUniversity = async (university: UniversityInterface) => {
  const response = await axios.post('/api/universities', university);
  return response.data;
};

export const updateUniversityById = async (id: string, university: UniversityInterface) => {
  const response = await axios.put(`/api/universities/${id}`, university);
  return response.data;
};

export const getUniversityById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/universities/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteUniversityById = async (id: string) => {
  const response = await axios.delete(`/api/universities/${id}`);
  return response.data;
};
