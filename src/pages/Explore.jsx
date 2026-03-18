import { useMemo, useState } from 'react';
import JobCard from '../components/JobCard';
import './Explore.css';

function Explore() {
  const workers = [
    {
      id: 1,
      name: 'Marco Rinaldi',
      role: 'University student · Gardening helper',
      area: 'Bologna - San Donato',
      presentation: 'I handle quick garden cleanup, leaf collection and basic outdoor maintenance with care.',
      rating: '9.1',
      reviews: 48,
      profileImage: 'https://images.pexels.com/photos/8961067/pexels-photo-8961067.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Gardening'
    },
    {
      id: 2,
      name: 'Elisa Conti',
      role: 'Secondary school student · Lawn care assistant',
      area: 'Bologna - Navile',
      presentation: 'Reliable for mowing, edge finishing and seasonal garden tidying in residential spaces.',
      rating: '8.7',
      reviews: 32,
      profileImage: 'https://images.pexels.com/photos/3771069/pexels-photo-3771069.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Gardening'
    },
    {
      id: 3,
      name: 'Luca Ferri',
      role: 'University student · Outdoor setup worker',
      area: 'Bologna - Saragozza',
      presentation: 'I support furniture setup, small lifting tasks and practical outdoor organization jobs.',
      rating: '8.9',
      reviews: 27,
      profileImage: 'https://images.pexels.com/photos/8867434/pexels-photo-8867434.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Manual Work'
    },
    {
      id: 4,
      name: 'Sara Bellini',
      role: 'University student · Plant care helper',
      area: 'Bologna - Mazzini',
      presentation: 'Plant watering and balcony care with attention to routine, timing and plant health.',
      rating: '9.4',
      reviews: 55,
      profileImage: 'https://images.pexels.com/photos/7841828/pexels-photo-7841828.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Gardening'
    },
    {
      id: 5,
      name: 'Davide Neri',
      role: 'Secondary school student · Tool organization helper',
      area: 'Bologna - Centro',
      presentation: 'I organize tools, storage shelves and work areas to keep spaces clean and functional.',
      rating: '8.5',
      reviews: 21,
      profileImage: 'https://images.pexels.com/photos/8867474/pexels-photo-8867474.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Manual Work'
    },
    {
      id: 6,
      name: 'Giulia Rosati',
      role: 'University student · Garden maintenance worker',
      area: 'Bologna - Porto',
      presentation: 'Available for pruning support, cleanup and simple weekly garden maintenance sessions.',
      rating: '9.0',
      reviews: 39,
      profileImage: 'https://images.pexels.com/photos/7841672/pexels-photo-7841672.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Gardening'
    }
  ];

  const [query, setQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = useMemo(
    () => ['All', ...new Set(workers.map((worker) => worker.category))],
    [workers]
  );

  const filteredJobs = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return workers.filter((worker) => {
      const matchesFilter = activeFilter === 'All' || worker.category === activeFilter;

      const matchesQuery =
        normalizedQuery.length === 0 ||
        worker.name.toLowerCase().includes(normalizedQuery) ||
        worker.area.toLowerCase().includes(normalizedQuery) ||
        worker.presentation.toLowerCase().includes(normalizedQuery);

      return matchesFilter && matchesQuery;
    });
  }, [activeFilter, workers, query]);

  return (
    <main className="explore-page">
      <section className="explore-header">
        <h1>Explore young workers</h1>
        <p>Find trusted local profiles for gardening and practical manual support.</p>
      </section>

      <section className="explore-toolbar">
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Search by name or area..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>

        <button
          type="button"
          className="filter-button"
          onClick={() => setIsFilterOpen((prev) => !prev)}
        >
          Filter
        </button>
      </section>

      {isFilterOpen && (
        <section className="filter-panel">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`filter-chip ${activeFilter === category ? 'active' : ''}`}
              onClick={() => setActiveFilter(category)}
            >
              {category}
            </button>
          ))}
        </section>
      )}

      <section className="jobs-grid">
        {filteredJobs.map((worker) => (
          <JobCard
            key={worker.id}
            name={worker.name}
            role={worker.role}
            area={worker.area}
            presentation={worker.presentation}
            rating={worker.rating}
            reviews={worker.reviews}
            profileImage={worker.profileImage}
          />
        ))}
      </section>

      {filteredJobs.length === 0 && (
        <p className="empty-state">No worker found for your search and filter selection.</p>
      )}
    </main>
  );
}

export default Explore;
