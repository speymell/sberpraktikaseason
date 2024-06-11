package Sber.Sber.repositories;

import Sber.Sber.models.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ClientRepository extends JpaRepository<Client, Long>{

    Optional<Client> findByEmail(String email);

    List<ClientRepository.ClientProjection> findByCompanyId(Long companyid);

    interface ClientProjection {

        Long getId();

        String getFirstname();

        Integer getAge();

        String getEmail();

        String getMiddlename();

        String getLastname();

        String getnumberPhone();
    }
}
