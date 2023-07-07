import axios from 'axios';
import queryString from 'query-string';
import { ProfessorInterface, ProfessorGetQueryInterface } from 'interfaces/professor';
import { GetQueryInterface } from '../../interfaces';

export const getProfessors = async (query?: ProfessorGetQueryInterface) => {
  const response = await axios.get(`/api/professors${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createProfessor = async (professor: ProfessorInterface) => {
  const response = await axios.post('/api/professors', professor);
  return response.data;
};

export const updateProfessorById = async (id: string, professor: ProfessorInterface) => {
  const response = await axios.put(`/api/professors/${id}`, professor);
  return response.data;
};

export const getProfessorById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/professors/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteProfessorById = async (id: string) => {
  const response = await axios.delete(`/api/professors/${id}`);
  return response.data;
};
