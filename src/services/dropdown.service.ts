import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import Dropdown from '../models/dropdown.model';
import DropdownOption from '../models/dropdown-options.model';
import {
  DropdownCreateDto,
  DropdownUpdateDto,
} from '../dto/dropdown.dto';

@Injectable()
export default class DropdownService {
  /* ----------------------------------
     CREATE DROPDOWN
  ---------------------------------- */
  async create(data: DropdownCreateDto) {

    const t = await DropdownOption.sequelize.transaction();

    try {
        const dropdown = await Dropdown.create({
        code: data.code,
        name: data.name,
        });

     const optionsPayload = data.options.map((opt, index) => ({
        dropdown_id: dropdown.dropdown_id,
        label: opt.label,
        value: opt.value,
        sort_order: opt.sort_order ?? index + 1,
        is_active: opt.is_active ?? true,
        }));

        await DropdownOption.bulkCreate(optionsPayload);
        await t.commit();
        return this.findById(dropdown.dropdown_id);
    } catch (error) {
        await t.rollback();
        throw error;
    }
  }

  /* ----------------------------------
     GET ALL DROPDOWNS
  ---------------------------------- */
  async findAll() {
    return Dropdown.findAll({
      include: [
        {
          model: DropdownOption,
          as: 'options',
          order: [['sort_order', 'DESC']],
          required: false,
        },
      ],
      order: [['createdAt', 'DESC']],
    })
  }

  /* ----------------------------------
     GET DROPDOWN BY ID
  ---------------------------------- */
  async findById(id: number) {
    const dropdown = await Dropdown.findByPk(id, {
      include: [
        {
          model: DropdownOption,
          as: 'options',
          required: false,
        },
      ],
    });

    if (!dropdown) {
      throw new NotFoundException(
        `Dropdown with ID ${id} not found`,
      );
    }

    return dropdown;
  }

  /* ----------------------------------
     UPDATE DROPDOWN + OPTIONS
  ---------------------------------- */
  async update(id: number, data: DropdownUpdateDto) {
    const dropdown = await this.findById(id);

    await dropdown.update({
      name: data.name ?? dropdown.name,
    });

    if (data.options) {
      for (const opt of data.options) {
        const existingOption = await DropdownOption.findOne({
          where: {
            dropdown_id: id,
            value: opt.value,
          },
        });

        if (existingOption && !opt.isDeletedByUser) {
          await existingOption.update({
            label: opt.label,
            sort_order:
              opt.sort_order ?? existingOption.sort_order,
            is_active:
              opt.is_active ?? existingOption.is_active,
          });
        } else if(existingOption && opt.isDeletedByUser){
            await this.deleteOption(existingOption?.dropdown_option_id)
            continue;
        }else {
          await DropdownOption.create({
            dropdown_id: id,
            label: opt.label,
            value: opt.value,
            sort_order: opt.sort_order ?? 1,
            is_active: opt.is_active ?? true,
          });
        }
      }
    }

    return this.findById(id);
  }

  /* ----------------------------------
     DELETE DROPDOWN (SOFT DELETE)
  ---------------------------------- */
  async delete(id: number) {
    const dropdown = await Dropdown.findByPk(id);
    if (!dropdown) {
      throw new NotFoundException(
        `Dropdown with ID ${id} not found`,
      );
    }

    await dropdown.destroy();
    return { success: true };
  }

  /* ----------------------------------
     DELETE SINGLE OPTION
  ---------------------------------- */
  async deleteOption(optionId: number) {
    const option = await DropdownOption.findByPk(optionId);
    if (!option) {
      throw new NotFoundException(
        `Dropdown option not found`,
      );
    }

    await option.destroy({ force: true });
    return { success: true };
  }
}