import { useState } from 'react';
import './CreateGoal.scss';
import { useQuery, useQueryClient, useMutation, QueryClient } from "react-query";
import { apiRequest } from "../../utils/axios.jsx";

function CreateGoal() {

  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newGoal) => {
      return apiRequest.post("/goals", newGoal);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["goals"]);
      }
    }
  )

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = {
      description,
      image,
      category,
    };

    console.log("Form submitted", formData);
    mutation.mutate(formData)
    setDescription('');
    setImage('');
    setCategory('');
  };


  return (
    <div className='goal-form'>
      <form className="goal-form__container" onSubmit={handleSubmit}>
        <div className="goal-form__group">
          <label className="goal-form__label" htmlFor="description">
            What would you like to commit to?
          </label>
          <input
            className="goal-form__input"
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="I will ..."
            required
          />
        </div>
        <div className="goal-form__group">
          <label className="goal-form__label" htmlFor="image">
            Image URL:
          </label>
          <input
            className="goal-form__input"
            type="text"
            id="image"
            value={image}
            placeholder='Optional'
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div className="goal-form__group">
          <label className="goal-form__label" htmlFor="category">
            Category:
          </label>
          <select
            className="goal-form__select"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="physical-health">Physical Health</option>
            <option value="mental-health">Mental Health</option>
            <option value="work-and-productivity">Work and Productivity</option>
            <option value="relationships">Relationships</option>
            <option value="meaning-and-purpose">Meaning and Purpose</option>
          </select>
        </div>
        <button className="goal-form__button" type="submit">
          Post Goal
        </button>
      </form>
    </div>


  )
}

export default CreateGoal