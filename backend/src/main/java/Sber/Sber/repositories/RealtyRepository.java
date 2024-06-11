package Sber.Sber.repositories;

import Sber.Sber.models.Realty;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Repository;

@Repository
public interface RealtyRepository extends JpaRepository<Realty, Long> {
    Optional<Realty> findByRealtyname(String realtyname);

    List<RealtyRepository.RealtyProjection> findByCompanyForRealty_Companyname(String companyname);

    interface RealtyProjection {
        Long getId();

        String getrealtyname();

        Double getprice();

        Double getfloor();

        Double getallfloor();

        Double getsquare();

        String gettype();

        String getadress();

        Integer getyear();

        String getstatus();

        String getdescription();

        Date getupdatedAt();

        Double getnumberRooms();

        Long getUserForRealtyId();

        Long getpreviewImageId();

        Long getsellerid();

        Long getclientId();

    }
}
